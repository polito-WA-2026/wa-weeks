import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MyButton from './Button';

function App() {
	return (
		<>
			<p>
				Press here: <MyButton language='en' />
				<Counter initialCount={0} />
			</p>
			<ButtonGroup names={['Chess', 'Poker', 'Black Jack', 'Go']} />
		</>
	);
}

function Counter(props) {
	const [count, setCount] = useState(props.initialCount);
	return (
		<>
			Count: {count}
			<Button onClick={() => setCount(props.initialCount)}>Reset</Button>
			<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
			<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
		</>
	);
}


function SimpleButton (props) {
	return (
		<Button variant={props.selected?'primary':'secondary'}
		   onClick={() => props.choose(props.index)} >{props.name}</Button>
	)
}

function ButtonGroup (props) {
	const [selected, setSelected] = useState(3);

	const chooseButton = (index) => setSelected(index);
	return (
		<Form>
		{
			props.names.map((e,idx) => <SimpleButton
			  name={e} index={idx} key={idx}
			  selected={idx===selected} choose={chooseButton}></SimpleButton>)
		}
		</Form>
	)
}


{/* <ButtonGroup names={['Chess', 'Poker', 'Black Jack', 'Go']} /> */}


export default App
