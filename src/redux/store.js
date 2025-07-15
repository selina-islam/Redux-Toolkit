import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './feature/counter/counterSlice'
import todoReducer from './feature/Todo/todoSlice'
const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
    }
})
export default store