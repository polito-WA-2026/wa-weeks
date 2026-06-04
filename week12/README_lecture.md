# Exam #1: "Theater"
## Student: s999999 ENRICO MASALA

## React Client Application Routes

- Route `/`: list of courses
- Route `/studyplan`: list of courses + studyplan (that can be edited)
- Route `/login`: login with credentials / TOTP

## API Server

- GET `/api/courses`
  - response body: list of courses with constraints. Example:
   [ {"code": "02LSEOV", "name": "Computer architectures", "cfu": 12, "maxStudents": 3, "incompat": [], "mandatory" : null, "numStudents": 2 }, ... ]

- GET `/api/studyplan`  (Authenticated)
  - response body: list of courses in the study plan of the authenticated user
   { "min": 60, "max": 80, "full-time": true, "courseList": ["O2LSEOV", "01OTWOV", ... ]} or
   { }

- POST `/api/studyplan`  (Authenticated)
  - request body: list of courses in the study plan to be saved: 
     { "full-time": true, [ "O2LSEOV", "01OTWOV", ... ] } for creation case or
     { [ "O2LSEOV", "01OTWOV", ... ] } for modification case
  - response body: ok  {} or not: { "errors": [...] }

- DELETE `/api/studyplan`  (Authenticated)
  - response body: ok  {} or not: { "errors": [...] }



* POST `/api/sessions`
* Description: Create a new session starting from given credentials.
* Request body: An object with username and password

```
{
  "username": "harry@test.com",
  "password": "pwd"
}
```

* Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
* Response body: _None_


### Get the current session if existing

* GET `/api/sessions/current`
* Description: Verify if the given session is still valid and return the info about the logged-in user. A cookie with a VALID SESSION ID must be provided to get the info of the user authenticated in the current session.
* Request body: _None_ 
* Response: `201 Created` (success) or `401 Unauthorized` (error).
* Response body: An object with user information

```
{
  "username": "harry@test.com",
  "id": 4,
  "name": "Harry"
}
```

### Destroy the current session (logout)

* DELETE `/api/sessions/current`
* Description: Delete the current session. A cookie with a VALID SESSION ID must be provided.
* Request body: _None_
* Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
* Response body: _None_


## Database Tables

- Table `users` - id, username, name, salt, hash, secret, lastTotpStep, full-time 
- Table `courses` - code, name, cfu, max_students, mandatory_courses
- Table `incompat` - course1, course2
- Table `studyplan` - student_id, course

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials

- username, password (plus any other requested info which depends on the text)
- username, password (plus any other requested info which depends on the text)

