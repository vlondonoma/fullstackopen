import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) =><button onClick={clickHandler}>{text}</button>

const Title = ({text}) =><h2>{text}</h2>

const Anecdote = ({text,votes}) => <div>{text}<p> Has {votes} votes</p></div>

const Today = ({text,nextHandler,votesHandler,votes}) => {
    return (
        <>
        <Title text="Anecdote of the day"/>
        <Anecdote text={text} votes={votes}/>        
        <Button text="Vote" clickHandler={votesHandler}/>
        <Button text="Next anecdote" clickHandler={nextHandler}/>
        </>
    )
  }

  const MostVotes = ({text,votes}) => {
    return (
        <>
        <Title text="Anecdote with most votes"/>
        <Anecdote text={text} votes={votes}/>     
        </>
    )
  }

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [maxVotation, setMaxVotation] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

  const nextHandler = () => {   
        let nextRandom =  Math.floor(Math.random() * 6)
        setSelected(nextRandom)
  }

  const votesHandler = () => {   
        let copy = { ...votes }
        copy[selected] += 1
        if(copy[selected]>maxVotation){
            setMaxVotation(copy[selected])
            setMostVoted(selected)
        }
        setVotes(copy)
    }

  return (
    <>
        <Today text={anecdotes[selected]} votes={votes[selected]} nextHandler={nextHandler} votesHandler={votesHandler}/>
        <MostVotes text={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)