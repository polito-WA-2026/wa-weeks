import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router';
import { Col, Container, Row, Navbar, Button } from 'react-bootstrap';
import './App.css';

import { AnswerTable } from './components/AnswerComponents.jsx';
import { QuestionDescription } from './components/QuestionComponents.jsx';
import { FormRoute } from './components/FormComponents.jsx';

import { Question } from './QAModels.js';

const question = new Question(1, 'Best way of enumerating an array in JS?', 'Enrico', '2024-03-01');
question.init();
const initialAnswerList = question.getAnswers();


function MyHeader(props) {
	return (
		<Navbar bg="primary" variant="dark">
      <Navbar.Brand className="mx-2">
      <i className="bi bi-collection-play" />
      {/* props.appName just in case you want to set a different app name */}
			{props.appName || "HeapOverrun"}
      </Navbar.Brand>
		</Navbar>
	);
}


function MyFooter(props) {
  return (<footer>
    <p>&copy; Web Applications</p>
    <div id="time"></div>
  </footer>);
}



function Main(props) {


  return (<>
    <Row>
      <QuestionDescription question={question} />
    </Row>
    <Row>
      <Col>
        <h2>Current Answers</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <AnswerTable listOfAnswers={props.answers} vote={props.voteAnswer}
          delete={props.deleteAnswer} edit={props.setEditAnswer} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Link to="/add">
          <Button>Add an answer</Button>
        </Link>
      </Col>
    </Row >
  </>
  );
}


function App() {

  const [ answers, setAnswers ] = useState(initialAnswerList);

  //const [ showForm, setShowForm ] = useState(false);

  //const [ editObj, setEditObj ] = useState(undefined);
  
  function voteAnswer(id, delta) {
    setAnswers( answerList => 
      answerList.map(e => e.id === id ? Object.assign({}, e, {score: e.score+delta}) : e)
    );
  }

  function deleteAnswer(id) {
    setAnswers( answerList =>
      answerList.filter(e => e.id !== id)
    );
  }

  function addAnswer(answer) {
    setAnswers( answerList =>
      // Use Max for new id just because we do not have a server that returns a new id. Do not use in real applications
      [...answerList, Object.assign({}, answer, {id: Math.max(...answerList.map(e => e.id)) + 1})] );
  }

  function saveExistingAnswer(newAnswer) {
    setAnswers( answerList =>
      answerList.map(e => e.id === newAnswer.id ? {...newAnswer} : e)
    );
    //setShowForm(false);
    //setEditObj(undefined);
  }

  function setEditAnswer(id) {
    //setEditObj( answers.find( e => e.id === id) );
    //setShowForm(true);
  }


  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Main answers={answers} voteAnswer={voteAnswer}
             deleteAnswer={deleteAnswer} setEditAnswer={setEditAnswer} />} />
        <Route path="/add" element={<FormRoute  addAnswer={addAnswer} />} />
        <Route path="/edit/:answerId" element={<FormRoute answers={answers}
             saveExistingAnswer={saveExistingAnswer} />} />
        <Route path="/*" element={<p>Not found</p>} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
      </Row>
      <Outlet />
      <Row>
        <Col>
          <MyFooter />
        </Col>
      </Row>
    </Container>
  )
}

export default App
