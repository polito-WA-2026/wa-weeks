import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button } from "react-bootstrap";
import MyButton from './Button';

function App() {
	return (
		<p>
		Press here: <MyButton language='en' />
		<Counter initialCount={0} />
		</p>
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

export default App
