import './App.css';
import {GreetBAD, Greet} from './Greet';
import Count from "./Count";
import {useState} from "react";
import QuickGate from "./QuickGate";
import TextFlipper from "./TextFlipper";
import TextFlipperLastResponse from "./TextFlipperLastResponse";
import TextFlipperSimple from "./TextFlipperSimple";



function App() {
    const [num, setNum] = useState(3) ;

    return (
        <div className="App">
            <Greet name='Enrico' />
            <hr />
            <Count num={num}/> <button onClick={()=>setNum(i=>i+1)}>+</button>
            <hr/>
            <QuickGate/>
            {/* <hr/>
            Button: <TextFlipperSimple /> */}
            <hr/>
            onChange: <TextFlipper />
            {/* <hr/>
            lastResponse: <TextFlipperLastResponse />  */}
        </div>
    );
}

export default App
