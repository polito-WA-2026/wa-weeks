import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { Col, Container, Row, Navbar, Button } from 'react-bootstrap';
import './App.css';

import { AnswerTable } from './components/AnswerComponents.jsx';
import { QuestionDescription } from './components/QuestionComponents.jsx';
import { AnswerForm } from './components/FormComponents.jsx';

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

  const [ answers, setAnswers ] = useState(initialAnswerList);

  const [ showForm, setShowForm ] = useState(false);

  const [ objToEdit, setObjToEdit ] = useState(undefined);

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
    setShowForm(false);
  }

  function editAnswer(newAnswer) {
    setAnswers( answerList =>
      answerList.map(e => e.id === newAnswer.id ? {...newAnswer} : e)
    );
    setShowForm(false);
    setObjToEdit(undefined);
  }

  function setEditAnswer(id) {
    console.log("Editing answer with id: ", id);
    setShowForm(true);
    const obj = answers.find(e => e.id === id);
    setObjToEdit(obj);
  }

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
        <AnswerTable listOfAnswers={answers} vote={voteAnswer} 
        delete={deleteAnswer} edit={setEditAnswer} />
      </Col>
    </Row>
    {showForm ? <Row>
      <Col>
        <AnswerForm addAnswer={addAnswer} setShowForm={setShowForm} objToEdit={objToEdit}
           editAnswer={editAnswer} />
      </Col>
    </Row> :
    <Row>
      <Col>
        <Button onClick={() => setShowForm(true)}>Add an answer</Button>
      </Col>
    </Row>}
  </>
  );
}


function App() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
      </Row>
      <Main />
      <Row>
        <Col>
          <MyFooter />
        </Col>
      </Row>
    </Container>
  )
}

export default App
