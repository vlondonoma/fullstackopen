import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) =><h1>{text}</h1>

const Button = ({text, clickHandler}) =><button onClick={clickHandler}>{text}</button>

const Statistic = ({text, count}) => (
    <tr>
        <td>{text}</td>
        <td>{count}</td>
    </tr>
)

const Statistics = ({good, neutral, bad, total}) => {

    const avg = () =>  ((good*1)+(bad*-1))/total
    const positive = () => good*100/total

    if (total>0){
        return (
            <table>
                <Statistic text="Good" count={good}/>
                <Statistic text="Neutral" count={neutral}/>
                <Statistic text="Bad" count={bad}/>
                <Statistic text="Average" count={avg()}/>
                <Statistic text="Positive (%)" count={positive()}/>
            </table>
        )
    }else{
        return <p>No feedback given</p>
    }
    
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodHandler = () => {
    setGood(good+1)
    setTotal(total+1)
  }

  const neutralHandler = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }

  const badHandler = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  return (
      <>
            <Title text="Unicafe Feedback"/>
            <Button text="Good" clickHandler={goodHandler}/>
            <Button text="Neutral" clickHandler={neutralHandler}/>
            <Button text="Bad" clickHandler={badHandler}/>
            <Title text="Statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      </>   
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)