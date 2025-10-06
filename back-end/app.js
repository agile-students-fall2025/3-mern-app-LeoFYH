require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the database models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// ---------------------
// existing routes
// ---------------------

// get all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// get one message by id
app.get('/messages/:messageId', async (req, res) => {
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// save a message
app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// ---------------------
// new route: /api/about
// ---------------------

app.get('/api/about', (req, res) => {
  res.json({
    name: "Yuhang Fu",
    description: `
      I am a computer science and game design student at NYU.
      I love creating interactive experiences that blend creativity and logic.
      My projects focus on game mechanics, emotional design, and player experience.
      Outside of coding, I enjoy drawing, playing indie games, and exploring digital art.
    `,
    photo: "https://i.imgur.com/GWf4KgL.jpeg" //
  })
})

// ---------------------

// export the express app we created
module.exports = app
