const Comment__lists = ({ comments }) => {
  const render_comments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ))

  return (
    <div>
      {' '}
      <ul>{render_comments}</ul>{' '}
    </div>
  )
}

export default Comment__lists
