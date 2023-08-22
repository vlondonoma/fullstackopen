import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showTemporalMessage(`You voted for anecdote: '${content}'`))
  }

  return (
    <>
      {anecdotes
        .filter(anecdote => {
            return filter === ""
                ? true
                : anecdote.content.includes(filter)
        })
        .sort((x, y) => {
					if (x.votes > y.votes) 
            return -1
					else
            return 1
				})
        .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )
      }
    </>
  )
}

export default AnecdoteList