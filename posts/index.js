const express = require('express')
const axios = require('axios')

const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (_, res) => {
  return res.send(posts)
})

app.post('/posts', async (req, res) => {
  const { title } = req.body
  const _id = randomBytes(4).toString('hex')
  posts[_id] = {
    _id,
    title,
  }

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id: _id,
      title,
    },
  })

  return res.status(201).send(posts[_id])
})

app.post('/events', (req, res) => {
  console.log(req.body)
  res.send({})
})

app.listen(4000, () => {
  console.log('-- posts server -- :: 4000')
})
