import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
const timer = useRef();
const dialog = useRef();

const[timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;    

if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.showModal(); // bad practice of updating state,but here we have if condition in use
}

function handleReset(){
    setTimeRemaining(targetTime * 1000);
}

function handleStart(){
    timer.current = setInterval(() => {
        setTimeRemaining(previousTime => previousTime - 10);
    },10)
}

function handleStop(){
    dialog.current.showModal();
    clearInterval(timer.current);
}

    return (
       <>
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" remainingTime = {timeRemaining} onReset = {handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
             <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
             </p>
             <p>
                <button onClick={timeIsActive ? handleStop : handleStart}>    
                    {timeIsActive ? "Stop" : "Start"} Challenge
                </button>
             </p>
             <p className={timeIsActive ? 'active': ''}>
                {timeIsActive ? "Time is running....." : "Time InActive"}
             </p>
        </section>
       </>
    )
}