const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  if (type === 'PostCreated') {
    const { id, title } = data
    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, postid, content } = data
    const post = posts[postid]
    console.log(id, postid, content)

    post.comments.push({ id, content })
  }

  res.send({})

  console.log(posts)
})

app.listen(4002, () => {
  console.log('-- query -- :: 4002')
})
