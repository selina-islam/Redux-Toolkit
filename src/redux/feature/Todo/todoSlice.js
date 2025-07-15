import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({
name:"todo",
initialState:[],
reducers:{
  addTodo: (state, action)=>{
    state.push({
      id: Date.now(), // unique ID based on timestamp
      text:action.payload.text, // expects { text: 'Learn Redux' }
      completed: false,
    })
  },
  toggleTodo:(state,action)=>{
const todo=state.find((todo)=> todo.id === action.payload)
if(todo){
  todo.completed = !todo.completed;
}
  },
  removeTodo:(state, action)=>{
return state.filter((todo)=> todo.id !==action.payload)
  },
  loadFromStorage: (state, action)=>{
    return action.payload
  }
}
})
export const {addTodo, toggleTodo, removeTodo, loadFromStorage}= todoSlice.actions
export default todoSlice.reducer