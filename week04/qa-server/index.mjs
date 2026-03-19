
import express from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';

import dao from './dao.mjs'; // module for accessing the DB.  NB: use ./ syntax for files in the same dir

const app = express();

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());  // To automatically decode incoming json

app.get('/', (req, res) => {
    res.send('Hello!');
});

/*** APIs ***/

// GET /api/questions
app.get('/api/questions', (req, res) => {
    dao.listQuestions()
      .then(questions => res.json(questions))
      .catch(() => res.status(500).end());
  });


// GET /api/questions/<id>/answers
app.get('/api/questions/:id/answers', [
  check('id').isInt({ min: 1 })
],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const result = await dao.listAnswersByQuestion(req.params.id);
    //console.log("result: "+JSON.stringify(result));
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);  // NB: list of answers can also be an empty array
  } catch (err) {
    res.status(500).end();
  }
});

  
// POST /api/answers
app.post('/api/answers', [
  check('questionId').isInt({ min: 1 }),
  check('score').isInt(),
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('text').isString().notEmpty(),
  check('respondent').isString().notEmpty()
],
   async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const answer = {
    questionId: req.body.questionId,
    score: req.body.score,
    date: req.body.date,
    text: req.body.text,
    respondent: req.body.respondent,
  };

  try {
    const newId = await dao.createAnswer(answer);
    res.status(201).json(newId);  // could also be the whole object including the newId
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of the answer` });
  }
}
);


// DELETE /api/answers/<id>
app.delete('/api/answers/:id', async (req, res) => {

  try {
    const numRowChanges = await dao.deleteAnswer(req.params.id);
    res.status(200).json(numRowChanges); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error during the deletion of the answer` });
  }
}
);


// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', [
  check('id').isInt({ min: 1 }),
  check('vote').isIn(['upvote', 'downvote'])
],
   async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  try {
    const numRowChanges = await dao.voteAnswer(req.params.id, req.body.vote);
    res.status(201).json(numRowChanges);  // could also be the whole object including the newId
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of the answer` });
  }
}
);


app.listen(3001, ()=>{console.log('Server ready');})