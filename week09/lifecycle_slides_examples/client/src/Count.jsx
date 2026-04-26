import {useEffect} from "react";

function Count(props) {
    const isMultiple3 = (props.num % 3 === 0);

    useEffect( ()=>{ console.log(`My static number is ${props.num}`)},  [] ) ;
    // run only once

    useEffect( ()=>{ console.log(`My dynamic number is ${props.num}`)},  [props.num] ) ;
    // run at every change

    useEffect( ()=>{ console.log(`My multiple flag is ${isMultiple3}`)},  [isMultiple3] ) ;
    // run every time isMultiple3 changes

    return <div>{props.num}</div>;


}

export default Count ;