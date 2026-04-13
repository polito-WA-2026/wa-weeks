
import { useState } from "react";
import { Button } from "react-bootstrap";

function MyButton(props) {
	let [buttonLang, setButtonLang] = useState(props.language) ;
	if (buttonLang === 'it')
		return <Button variant="primary" onClick={()=>setButtonLang('en')}>Ciao!</Button>;
	else
		return <button onClick={()=>setButtonLang('it')}>Hello!</button>;
}

export default MyButton;
