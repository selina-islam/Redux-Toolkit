import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './feature/counter/counterSlice'
import todoReducer from './feature/Todo/todoSlice'
import bookReducer from "../freature/booklist/bookSlice";
import counterReduce from '../freature/counter/CounterSlice'
import postReducer from './../freature/fetchData/postSlice';
import productReducer  from "../freature/e-commerce/productSlice";
import { productApi } from "../rtk-query/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
         counterSlice: counterReduce,
        book: bookReducer,
       posts: postReducer,
       product: productReducer,
       [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware)
})
 setupListeners(store.dispatch)
export default store