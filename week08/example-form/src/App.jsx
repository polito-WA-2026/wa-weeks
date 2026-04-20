import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import './App.css'

function MyForm (props) {
  const [valid, setValid] = useState(false);

  const [name, setName] = useState('');

  const handleSubmit = (event) => {
	  console.log('Name submitted: '+ name);
	  event.preventDefault();
  }

  const handleChange = (event) => {
    console.log('Name changed: '+ event.target.value);
    let val =  event.target.value;
    //.substring(0,3);
    if (val.length > 3) {
      setValid(true);
    }
	  setName(val) ;
  };

  return (
   <Form onSubmit={handleSubmit}>
    <label> Name:
      <Form.Control type="text" value={name} onChange={handleChange} />
    </label>
    <Button variant="primary" type="submit">Submit</Button>
    {valid ? <p>Valid</p> : <p>Invalid</p> }
  </Form>
  );
}


function App() {

  return (
    <MyForm />
  )
}

export default App
