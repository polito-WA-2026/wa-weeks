import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';

function AnswerActions(props) {
  const navigate = useNavigate();

  return (
    <>
      <Button className="mx-1" variant="primary" onClick={props.upvote} disabled={props.disabled}><i className="bi bi-arrow-up"></i></Button>
      <Button className="mx-1" variant="primary" onClick={props.downvote} disabled={props.disabled} ><i className="bi bi-arrow-down"></i></Button>      
      <Button className="mx-1" variant="danger" onClick={props.delete} 
      disabled={props.disabled || props.disableUserActions || props.disableTotpAction}><i className="bi bi-trash"></i></Button>
      <Button className="mx-1" variant="warning" onClick={()=>navigate(`/edit/${props.editId}`)} disabled={props.disabled || props.disableUserActions}><i className="bi bi-pencil"></i></Button>
    </>
  );
}

function AnswerRow(props) {
  const e = props.answer;
    
  let statusClass = null;

  switch(e.status) {
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }

  return (
      <tr className={statusClass}>
        <td>{e.date.format("YYYY-MM-DD")}</td>
        <td>{e.text}</td>
        <td>{e.respondent}</td>
        <td>{e.score}</td>
        <td><AnswerActions upvote={()=>props.vote(e.id, 1)} downvote={()=>props.vote(e.id, -1)}
                delete={()=>props.delete(e.id)} editId={e.id}
disabled={props.disabled} disableUserActions={e.respondentId !== props.userId}
disableTotpAction={props.disableTotpAction} /></td>
      </tr>
    );
  }
  
  function AnswerTable(props) {
    return (
      <Table>
        {/* <Table striped bordered hover> */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>        
          {/* the key can be the answer id, if unique */}
                  {props.listOfAnswers.map( (e) => 
                   <AnswerRow key={e.id} answer={e} vote={props.vote} delete={props.delete} 
                   edit={props.edit} disabled={props.disabled} userId={props.user ? props.user.id : -1}
                   disableTotpAction={props.disableTotpAction} /> )
          }
        </tbody>
      </Table>
    )
  }
  
  export { AnswerTable };
