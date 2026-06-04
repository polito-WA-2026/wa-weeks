
import Database from "./database.mjs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { initAuthentication, isLoggedIn } from "./auth.mjs";
import passport from "passport";

import { TOTP } from 'otpauth';

const PORT = 3001;
const app = new express();
const db = new Database("study_plan.db");

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

initAuthentication(app, db);

function verifyTotpToken(user, token) {
  const totp = new TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: user.secret
  });

  // Validate the code
  const delta = totp.validate({ token, window: 1 });
  if (delta === null) {
    return false; // invalid code
  }

  // Get the CURRENT time-step counter from OTPAuth
  //
  // Important:
  //  - delta tells us how many steps away the provided token is
  //  - counter() gives the *current* step index
  //
  // Therefore: actual_step = current_counter + delta
  //
  const currentCounter = totp.counter();  
  const actualStep = currentCounter + delta;
  //console.log('DEBUG: Token valid for step '+actualStep, ' (current counter: '+currentCounter+', delta: '+delta+')');

  if (actualStep <= user.lastTotpStep)
    return false;  // Reject replay or older step
  
  // Accept : update last-used step
  user.lastTotpStep = actualStep;
  return true;
}


function isTotp(req, res, next) {
  if(req.session.method === 'totp')
    return next();
  return res.status(401).json({ errors: ['Missing TOTP authentication'] });
}


/**
 * Get all the courses
 * or
 * Get the number of enrolled students for each course (that has at least one enrolled student).
 * The format for the returned object is {course_code1: num_students1, course_code2: num_students2, ...}.
 * Courses that do not appear in this object have zero enrolled students
 *
 * This is an open endpoint: non authenticated users can still access this
 */
app.get("/api/courses", async (req, res) => {
  try {
    const filter = req.query && req.query.filter;
    if (filter === 'enrolled') {
      const enrolled = await db.getNumStudents();
      res.json(enrolled);
    } else {
      const courses = await db.getCourses();
      res.json(courses);
    }
  } catch {
    res.status(500).json({errors: ["Database error"]});
  }
});


/**
 * Delete the current study plan for the currently logged in student
 * Requires TOTP authentication
 */
app.delete("/api/study-plan", isLoggedIn, isTotp, async (req, res) => {
  try {
    await db.deleteStudyPlan(req.user.id);
    res.end();
  } catch {
    res.status(500).json({errors: ["Database error"]});
  }
});

/**
 * Create a new study plan for the currently logged in user
 */
app.post(
  "/api/study-plan",
  isLoggedIn,
  body("fullTime", "fullTime must be a boolean").isBoolean(),
  body("courses", "No courses specified").isArray().isLength({min: 1}),
  body("courses.*", "Invalid course(s)").trim().toUpperCase().isString().isLength({min: 7, max: 7}),
  async (req, res) => {
    // Check if validation is ok
    const err = validationResult(req);
    const errList = [];
    if (!err.isEmpty()) {
      errList.push(...err.errors.map(e => e.msg));
      return res.status(400).json({errors: errList});
    }

    // Check if there was already a study plan
    if (req.user.fullTime !== null && req.user.fullTime !== undefined)
      return res.status(422).json({errors: ["Study plan already present"]});
    
    try {
      const checkErrors = await db.checkStudyPlan(req.body.fullTime, req.body.courses, req.user.id);

      if (checkErrors.length > 0) {
        res.status(422).json({errors: checkErrors});
      } else {
        // Perform the actual insertions
        await db.createStudyPlan(req.body.fullTime, req.body.courses, req.user.id);
        res.end();
      }
    } catch {
      return res.status(500).json({errors: ["Database error"]});
    }
});

/**
 * Edit the existing study plan for the currently logged in student
 */
app.post(
  "/api/study-plan-modifications",
  isLoggedIn,
  body("add", "add must be a list of courses").isArray(),
  body("rem", "rem must be a list of courses").isArray(),
  body("add.*", "Invalid course(s) in add").trim().toUpperCase().isString().isLength({min: 7, max: 7}),
  body("rem.*", "Invalid course(s) in rem").trim().toUpperCase().isString().isLength({min: 7, max: 7}),
  async (req, res) => {
    // Check if validation is ok
    const err = validationResult(req);
    const errList = [];
    if (!err.isEmpty()) {
      errList.push(...err.errors.map(e => e.msg));
      return res.status(400).json({errors: errList});
    }
    
    // Check if the student had a study plan
    if (req.user.fullTime === undefined || req.user.fullTime === null) {
      return res.status(422).json({errors: ["Student doesn't currently have a study plan"]});
    }

    // Build the resulting study plan and validate it
    try {
      let studyPlan = await db.getStudyPlan(req.user.id);

      for (const c of req.body.add) {
        studyPlan.push(c);
      }
      studyPlan = studyPlan.filter(c => !req.body.rem.includes(c));

      // Validate the resulting study plan
      const checkErrors = await db.checkStudyPlan(req.user.fullTime, studyPlan, req.user.id);

      if (checkErrors.length > 0) {
        res.status(422).json({errors: checkErrors});
      } else {
        // Actually update the study plan
        await db.editStudyPlan(req.body.add, req.body.rem, req.user.id);
        res.end();
      }
    } catch {
      res.status(500).json({errors: ["Database error"]});
    }
});

/**
 * Authenticate and login
 */
app.post('/api/login-totp', isLoggedIn,

  async (req, res) => {
    //console.log('DEBUG: TOTP login attempt for user '+JSON.stringify(req.user));
    if (!req.user.secret) {
      console.log('TOTP not enabled for this user');
      return res.status(400).json({ error: 'Cannot authenticate with TOTP'});
    }
    const success = verifyTotpToken(req.user, req.body.code);
    if (success) {
      req.session.method = 'totp';
      // STORE lastTotpStep in DB for replay protection
      try {
        //console.log('DEBUG: Updating lastTotpStep to '+req.user.lastTotpStep);
        await db.updateLastTotpStep(req.user.id, req.user.lastTotpStep);
      } catch (err) {
        console.log(err);
        return res.status(503).json({errors: ["Database error"]});
      }
      return res.json({otp: 'authorized'});
    } else {
      console.log('Invalid or replayed TOTP code');
      return res.status(401).json({errors: ["Cannot authenticate with TOTP: invalid code"]});
    }
  }
);

app.post(
  "/api/session",
  body("username", "username is not a valid email").isEmail(),
  body("password", "password must be a non-empty string").isString().notEmpty(),
  (req, res, next) => {
    // Check if validation is ok
    const err = validationResult(req);
    const errList = [];
    if (!err.isEmpty()) {
      errList.push(...err.errors.map(e => e.msg));
      return res.status(400).json({errors: errList});
    }

    // Perform the actual authentication
    passport.authenticate("local", (err, student) => {
      if (err) {
        res.status(err.status).json({errors: [err.msg]});
      } else {
        req.login(student, err => {
          if (err) return next(err);
          else {
            // Get the study plan for this student
            if (student.fullTime !== null) {
              db.getStudyPlan(student.id)
                .then(studyPlan => res.json({email: student.username, name: student.name, fullTime: student.fullTime, studyPlan,
                                             canDoTotp: student.secret? true: false, isTotp: req.session.method === 'totp' }))
                .catch(() => {
                  res.status(500).json({errors: ["Database error"]});
                });
            } else {
              res.json({email: student.username, name: student.name, fullTime: student.fullTime,
                        canDoTotp: student.secret? true: false, isTotp: req.session.method === 'totp' });
            }
          }
        });
      }
    })(req, res, next);
  }
);

/**
 * Logout
 */
app.delete("/api/session", isLoggedIn, (req, res) => {
  req.logout(() => res.end());
});

/**
 * Check if the user is logged in and return their info
 */
app.get("/api/session/current", isLoggedIn, async (req, res) => {
  let studyPlan = undefined;
  let err = false;

  if (req.user.fullTime !== null) {
    await (db.getStudyPlan(req.user.id)
      .then(sp => studyPlan = sp)
      .catch(() => {
        res.status(500).json({errors: ["Database error"]});
        err = true;
      }));
  }
  
  if (!err) res.json({email: req.user.username, name: req.user.name, fullTime: req.user.fullTime, studyPlan,
                      canDoTotp: req.user.secret? true: false, isTotp: req.session.method === 'totp' });
});

// Activating the server
app.listen(PORT, (err) => {
  if (err)
    console.log(err);
  else 
    console.log(`Server listening at http://localhost:${PORT}`);
}); 
