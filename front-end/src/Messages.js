import { useEffect, useState } from 'react'
import Message from './Message'
import './Messages.css'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:7001/messages')  
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMessages(data.messages || [])
      })
      .catch(err => {
        console.error('Error fetching messages:', err)
        setError(err.message)
      })
  }, [])

  if (error) {
    return <div className="Error">Error: {error}</div>
  }

  return (
    <section className="Messages">
      <h1>Messages</h1>
      {messages.length > 0 ? (
        messages.map(msg => <Message key={msg._id} message={msg} />)
      ) : (
        <p>No messages found.</p>
      )}
    </section>
  )
}

export default Messages
