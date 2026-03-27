'use client'

import { ChangeEvent, useEffect, useEffectEvent, useRef, useState } from "react";

type CountProps = {
    count:number;
}

export default function Counter(props:CountProps) {

    const [count,setCount] = useState(props.count);
    const inputRef = useRef<HTMLInputElement>(null)
    const clickCount = useRef(0);

    useEffect(() => {console.log("Count: ",count)},[count]);

    useEffect(() => {
        const handler = setInterval(()=>{
            console.log("Count useeffect: ",count);
        },5000)
        return () => {
            clearInterval(handler);
        }
    },[]);

    const logHandler = useEffectEvent(()=>{
        console.log("Count useeffectevent: ",count);
    });

    // let count = props.count;
    function inc(){
        console.log("Incrementing counter");
        //setCount(count + 1 );
        setCount((prevCount)=>prevCount+1);
        clickCount.current++;
        console.log("Click count: " , clickCount.current);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setCount(Number(event.target.value));
    }

    return (
        <div>
            <h4>Count : {count}</h4>
            <div>
                <button onClick={inc}>++</button> &nbsp;
                <button onClick={()=>setCount(count -1)}>--</button>;
            </div>
            <input type = "number" value = {count} onChange = {handleChange}/>
            <div>
                <input ref = {inputRef} type = "number" placeholder="Enter new count" /> &nbsp;
                <button onClick={()=> setCount(inputRef.current?.valueAsNumber || 0)}> UpdateCount </button>
            </div>
        </div>
    )
}