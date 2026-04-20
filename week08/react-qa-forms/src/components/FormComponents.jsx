import { Form, Button } from "react-bootstrap";
import { useState } from "react";


function AnswerForm(props) {

    const [ answerText, setAnswerText ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting answer: ", answerText);
        // Handle form submission logic here
    };

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group>
                <Form.Label>Answer</Form.Label>
                <Form.Control placeholder="Type your answer here..." 
                  value={answerText} onChange={(e) => setAnswerText(e.target.value)} />
            </Form.Group>

            <Button type="submit">Submit Answer</Button>
        </Form>
    )
}

export { AnswerForm };