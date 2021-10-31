import { useState } from 'react'
import { Form, Button, Input } from 'rsuite'
import axios from 'axios'

function Create_new__post() {
  const [title, setTitle] = useState('')

  const FormSubmitHandler = async (eve) => {
    eve.preventDefault()
    await axios.post('http://localhost:4000/posts', {
      title,
    })

    setTitle('')
  }

  return (
    <div className='container'>
      <form onSubmit={FormSubmitHandler}>
        <Form.Group>
          <Form.ControlLabel>Post Title</Form.ControlLabel>
          <Input
            required
            value={title}
            onChange={(e) => {
              setTitle(e)
            }}
          />
        </Form.Group>
        <Button
          appearance='primary'
          type='submit'
          style={{ float: 'right' }}
          className='mt-3'
        >
          Create
        </Button>
      </form>
      <br />
      <br />
      <hr />
    </div>
  )
}

export default Create_new__post
