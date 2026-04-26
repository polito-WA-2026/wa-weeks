import {useEffect, useState} from "react";

function TextFlipper(props) {
    const [text, setText] = useState('') ;
    const [flipped, setFlipped] = useState('') ;
    const [waiting, setWaiting] = useState(false) ;

    useEffect( ()=>{
        const fetchFlipped = async (reqText) => {
            const response = await fetch('http://localhost:3001/flip?text='+ 
                                          encodeURIComponent(reqText));
            const responseBody = await response.json() ;
            setFlipped( responseBody.text ) ;
            setWaiting(false);
        };
        setWaiting(true) ;
        fetchFlipped(text) ;
    }, [text]) ;

    const handleChange = (ev) => {
       setText(ev.target.value) ;
    } ;

    return <div>
        Text: <input type='text' value={text} onChange={handleChange}/><br/>
        Flipped: {waiting && <span>🕗</span>}{flipped}
    </div> ;
}

export default TextFlipper ;