import {useEffect, useState} from "react";

function TextFlipperSimple(props) {
    const [text, setText] = useState('') ;
    const [flipped, setFlipped] = useState('') ;
    const [waiting, setWaiting] = useState(false) ;


    const fetchFlipped = async (reqText) => {
        const response = await fetch('http://localhost:3001/flip?text='+ 
                                      encodeURIComponent(reqText));
        const responseBody = await response.json();
        setFlipped(responseBody.text);
        setWaiting(false);
    };

    const handleChange = (ev) => {
       setText(ev.target.value) ;
    } ;

    const fetchNewFlipped = () => {
        setWaiting(true) ;
        fetchFlipped(text) ;
    } ;

    return <div>
        Text: <input type='text' value={text} onChange={handleChange}/>
        <button disabled={waiting} onClick={fetchNewFlipped} >Update</button><br/>
        Flipped: {waiting && <span>🕗</span>}{flipped}
    </div> ;
}

export default TextFlipperSimple ;