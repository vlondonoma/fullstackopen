import Alert from 'react-bootstrap/Alert';

const Notification = ({ message}) => {
    if (message === null) {
      return null
    }

    return (
      <Alert key={message.type} variant={message.type}>
          {message.text}
      </Alert>
    )
  }

export default Notification