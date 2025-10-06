import React, { useEffect, useState } from 'react'

function Home() {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:7001/api/about')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => setAbout(data))
      .catch(err => setError(err.message))
  }, [])

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>
  }

  if (!about) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
  }

  return (
    <div style={{
      color: 'white',
      maxWidth: '700px',
      margin: '60px auto',
      lineHeight: '1.6',
      textAlign: 'center'
    }}>
      <img
        src={about.photo}
        alt="Profile"
        style={{ width: '200px', borderRadius: '100px', marginBottom: '20px' }}
      />
      <h1>{about.name}</h1>
      <p>{about.description}</p>
    </div>
  )
}

export default Home
