const express = require('express')
const axios = require('axios')

const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostID = {}

/** retrieving a post comments */
app.get('/posts/:id/comment', (req, res) => {
  return res.send(commentsByPostID[req.params.id] || [])
})

/** creating a post comments */
app.post('/posts/:id/comment', async (req, res) => {
  const { content } = req.body

  console.log('post id', req.params.id)

  const _id = randomBytes(4).toString('hex')

  const comments = commentsByPostID[req.params.id] || []

  comments.push({ id: _id, content })

  commentsByPostID[req.params.id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: _id,
      content,
      postid: req.params.id,
    },
  })

  return res.status(201).send(comments)
})

app.post('/events', (req, res) => {
  console.log(req.body)
  res.send({})
})

app.listen(4001, () => {
  console.log('-- comments server -- :: 4001')
})
