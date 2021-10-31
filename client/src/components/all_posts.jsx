import { useState, useEffect } from 'react'
import axios from 'axios'

import Comment from './create__comment'
import Comments from './comment__lists'

const All_posts = () => {
  const [posts, setPosts] = useState({})

  const __get_all_posts = async () => {
    const res = await axios.get('http://localhost:4002/posts')
    console.log(res.data)
    setPosts(res.data)
  }

  useEffect(() => {
    __get_all_posts()
  }, [])

  const renderPostLists = Object.values(posts).map((post) => (
    <div
      className='card'
      style={{ width: '30%', marginBottom: '20px' }}
      key={post.id}
    >
      {console.log(post.comments)}
      <div className='card-body'>
        <h3>{post.title}</h3>
        <Comments comments={post.comments} />
        <Comment _id={post.id} />
      </div>
    </div>
  ))

  return (
    <div className='container'>
      <div className='d-flex flex-row d-warp justify-content-between'>
        {renderPostLists}
      </div>
    </div>
  )
}

export default All_posts
