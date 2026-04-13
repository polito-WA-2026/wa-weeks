import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Table, Button } from 'react-bootstrap';
import './App.css'
import { Answer, Question } from './QAModels';

function MyHeader(props) {
  return (
     <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <div>
              <i className="bi bi-lightbulb" style={{fontSize: "2rem", color: "cornflowerblue"}}></i>
              <a className="navbar-brand" href="#">
                {props.title || "React Q&A"}
              </a>
            </div>
          </div>
        </nav>
      </header>
  );
}

function AnswerRow(props) {
  const ans = props.answer;
  return (  <tr>
    <td>{ans.date.format("YYYY-MM-DD")}</td>
    <td>{ans.text}</td>
    <td>{ans.respondent}</td>
    <td>{ans.score}</td>
    <td><Button>Vote</Button></td>
  </tr>);
}


function App() {
  const question = new Question(1, 'Best way of enumerating an array in JS?', 'Enrico', '2024-03-01');
  question.init();
  const answers = question.getAnswers();

  console.log(answers);

  return (
    <div className="container-fluid">
      <MyHeader title="HeapOverrun" />
      <main>
        <div className="row lead mt-4">
          <div className="d-flex justify-content-center">
            <p className="question" id="questionText">Best way of enumerating an array in JS?</p>
            <p className="question ms-5">by <span id="questionAuthorName">Enrico Masala</span></p>
          </div>
        </div>
        <h2>Answers</h2>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Text</th>
              <th>Author</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="answers">
            {answers.map(ans => <AnswerRow key={ans.id} answer={ans} />)}
          </tbody>
        </Table>
      </main>
      <footer>
        &copy; Web Applications  <span id="time"></span>
      </footer>
    </div>

  )
}

export default App
