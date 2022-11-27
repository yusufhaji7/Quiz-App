import React from "react"

export default function Quiz(props){
    const [answerState, setAnswerState] = React.useState({
        answeredAnswers: [],
        activeAnswer: null,
        objects: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]
    })
    const [result, setResult] = React.useState(0)
    
    function toggleActive(index){
        setAnswerState({
            ...answerState, 
            answeredAnswers: answerState.answeredAnswers.push(props.answer[index]), 
            activeAnswer: answerState.objects[index]
        })
        console.log(answerState.answeredAnswers)
    }

    function toggleActiveAnswer(index){
        if (answerState.objects[index] === answerState.activeAnswer){
            return "clicked-answer"
        }else{
            return "specific--answers"
        }
    }

    function resultfunc(){
        for (let i = 0; i < props.answer; i++){
            if (answerState.answeredAnswers === props.answer[i]){
                setResult(prevResult => 
                    prevResult + 1)
            }
        }
        return result
    }

    const choice = props.answer.map((item, index) => {
        
        return <div key={index} className={toggleActiveAnswer(index)} onClick={() => toggleActive(index)}>
            {item.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&ldquo;/g,'“')}
            </div>
        }
    )
    return (
        <div>
        <div className="main">
            <div className="main--page">
                <div className="questions">{props.question}</div>
                <div className="answers">{choice}</div>
                <hr />
            </div>
        </div>
        <button className="check--answers" style={{display: props.displayButton}} onClick={resultfunc}>Check answers</button>
        </div>
    )
}