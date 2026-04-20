import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";


function AnswerForm(props) {

    const [ text, setText ] = useState("");
    const [ date, setDate ] = useState("");
    const [ respondent, setRespondent ] = useState("");
    const [ score, setScore ] = useState(0);

    const handleScore = (event) => {
        setScore(event.target.value); // Cannot do parseInt here otherwise the single minus sign cannot be written
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting answer: ", text, date, respondent, score);
        // Handle form submission logic here
        // add the new answer to the list of answers in the main component
        const e = {
            text: text,
            date: dayjs(date),
            respondent: respondent,
            score: parseInt(score)
        };
        props.addAnswer(e);
    };

    return (
       <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={(event)=> setDate(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" name="text" value={text} onChange={(event)=> setText(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Respondent</Form.Label>
                <Form.Control type="text" name="respondent" value={respondent} onChange={(event) => setRespondent(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control type="number" name="score" value={score} onChange={handleScore} />
            </Form.Group>

            

            <Button type="submit">Add Answer</Button>
        </Form>
    )
}

export { AnswerForm };