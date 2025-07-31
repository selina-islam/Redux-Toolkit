import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

// async thunk to fetch posts from api
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.data
})

// create the post slice
const postSlice = createSlice({
  name: 'posts',

  // initial state of posts
  initialState: {
    isLoading: false,
    posts: [],
    error: null
  },

  // handle lifecycle of async thunk
  extraReducers: (builder) => {
    // when the fetch is in progress
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true
    })

    // when fetch is successful
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = action.payload
      state.error = null
    })

    // when fetch fails
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false
      state.posts = []
      state.error = action.error.message
    })
  }
})

// export the reducer to use in the store
export default postSlice.reducer
