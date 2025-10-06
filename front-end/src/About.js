import { useEffect, useState } from 'react'

const About = () => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:7001/api/about')
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(err => setError(err.message))
  }, [])

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (!about) return <p>Loading...</p>

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>About Me</h1>
      <img
        src={about.photo}
        alt={about.name}
        style={{ width: '200px', borderRadius: '10px', margin: '20px auto' }}
      />
      <h2>{about.name}</h2>
      <p style={{ whiteSpace: 'pre-line', maxWidth: '600px', margin: '0 auto' }}>
        {about.description}
      </p>
    </div>
  )
}

export default About
