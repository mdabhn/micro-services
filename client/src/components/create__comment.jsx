import { useState } from 'react'
import axios from 'axios'

function Create__comment({ _id }) {
  const [content, setContent] = useState('')

  const handleCommentSubmit = async (eve) => {
    eve.preventDefault()
    try {
      await axios.post(`http://localhost:4001/posts/${_id}/comment`, {
        content,
      })
    } catch (error) {
      console.log(error)
    }

    setContent('')
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <div className='form-group'>
          <label htmlFor='new-comment'>New Comment</label>
          <input
            type='text'
            className='form-control'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className='btn btn-dark mt-2 float-end'>Comment</button>
      </form>
    </div>
  )
}

export default Create__comment
