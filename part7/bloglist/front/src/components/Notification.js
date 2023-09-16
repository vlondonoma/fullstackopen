import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message) {
    return (
      <Alert key={message.type} variant={message.type}>
        {message.text}
      </Alert>
    )
  }

  return null
}

export default Notification