import React from "react"
import Quiz from "./Quiz"

export default function App(){
    const [questionData, setQuestionData] = React.useState({})
    const [startQuiz, setStartQuiz] = React.useState(false)
    
    React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestionData(data))
    }, startQuiz)

    function quizStarter(){
      setStartQuiz(true)
    }
    
    const answers = (ans, answe=[]) => {
      
        answe.push(ans)
        let ans_index = []
        let new_list = []

        while (true){
          const random_index = Math.floor(Math.random() * answe.length)
          if (ans_index.length === answe.length){
            break
          }else if (ans_index.includes(random_index)){
            continue
          }else{
            ans_index.push(random_index)
          }
        }
        for (let i = 0; i < answe.length; i++){
          if (new_list.includes(answe[ans_index[i]])){
            continue
          }else{
            new_list.push(answe[ans_index[i]])
          }
        }
        
        return (new_list) 
    }

    /*const main = () => {questionData.results.map((question) => {  
      return <Quiz 
        question={question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        answer={answers(question.correct_answer, question.incorrect_answers)}
      />
      })}*/
    return (
      <div>
        {
          startQuiz
          ?
          <div>
            {questionData.results.map((question, index) => {  
                return <Quiz 
                          question={question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
                          answer={answers(question.correct_answer, question.incorrect_answers)}
                          displayButton={(questionData.results.length - 1) === index ? "block" : "none"}
                          correctAnswer={question.correct_answer}
                          />
              })}
            
          </div>
          :
          <div>
            <div className="first--page">
              <h1 className="quizzical">Quizzical</h1>
              <p className="description">Some description if needed</p>
              <button className="start--quiz" onClick={quizStarter}>Start Quiz</button>
            </div>
          </div>
      }
      </div>
    )
}