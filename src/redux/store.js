import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './feature/counter/counterSlice'
import todoReducer from './feature/Todo/todoSlice'
import bookReducer from "../freature/booklist/bookSlice";
import counterReduce from '../freature/counter/CounterSlice'
const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
         counterSlice: counterReduce,
        book: bookReducer,
    }
})
export default store