import {useEffect, useState} from "react";

function TextFlipperLastResponse(props) {
    const [text, setText] = useState('') ;
    const [flipped, setFlipped] = useState('') ;
    const [waiting, setWaiting] = useState(false) ;
    //const [waitingNum, setWaitingNum] = useState(1) ;


    useEffect( ()=>{
        let ignore = false ;
        const fetchFlipped = async (reqText) => {
            const response = await fetch('http://localhost:3001/flip?text='+ 
                                          encodeURIComponent(reqText));
            const responseBody = await response.json();
            console.log(`text: "${text}" reqText: "${reqText}" flipped: "${responseBody.text}"`);
            if (!ignore) {
                setFlipped(responseBody.text);
                setWaiting(false);
            }
        };
        setWaiting(true) ;
        fetchFlipped(text) ;
        return () => { ignore = true; } ;
    }, [text] );


    const handleChange = (ev) => {
        //setWaitingNum( waitingNum + 1 ) ;
        const text = ev.target.value ;
        setText(text) ;
    } ;

    return <div>
        Text: <input type='text' value={text} onChange={handleChange}/><br/>
        Flipped: {waiting && <span>(🕗 {waiting}) </span>}{flipped}
    </div> ;
}

export default TextFlipperLastResponse ;