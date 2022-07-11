const Notification = ({ message}) => {
    if (message === null) {
      return null
    }

    const className = "alert alert-"+message.type
    return (
      <div className={className}>
        {message.text}
      </div>
    )
  }

export default Notification