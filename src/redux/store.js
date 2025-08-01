import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './feature/counter/counterSlice'
import todoReducer from './feature/Todo/todoSlice'
import bookReducer from "../freature/booklist/bookSlice";
import counterReduce from '../freature/counter/CounterSlice'
import postReducer from './../freature/fetchData/postSlice';
import productReducer  from "../freature/e-commerce/productSlice";
const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
         counterSlice: counterReduce,
        book: bookReducer,
       posts: postReducer,
       product: productReducer
    }
})
export default store