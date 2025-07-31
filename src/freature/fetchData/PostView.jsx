import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './postSlice'

const PostView = () => {
  // access posts, loading state, and error from redux store
  const { posts, isLoading, error } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  // fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]) 

  return (
    <div className='max-w-5/6 mx-auto bg-green-100 p-4'>
      <h2>post view via fetch data with redux toolkit</h2>

      {/* show loading text */}
      {isLoading && <p>loading...</p>}

      {/* show error message if there is an error */}
      {error && <p>{error}</p>}

      {/* map through posts and display them */}
      {posts && posts.map((book) => (
        <div key={book.id} className='flex flex-col space-y-4 gap-4'>
          <p>{book.id}. {book.title}</p>
          <p>{book.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostView
