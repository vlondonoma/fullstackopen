import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showTemporalMessage(`You created the anecdote: '${content}'`))
  }

  return (
    <>
      <h2>create new</h2>
      <form  onSubmit={addAnecdote}>
        <div><input name="anecdote" /> </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm