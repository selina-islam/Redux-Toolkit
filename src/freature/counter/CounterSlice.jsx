import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
name: 'counter',
initialState:{count:0},
reducers:{
    increment: state =>{
       if(state.count < 100){
         state.count += 1;
       }
    },
    decrement: state =>{
        if(state.count > 0){
            state.count -=1
        }
    },
    reset: state =>{
        state.count = 0;
    },
    IncrementByAmount: (state, action)=>{
        state.count +=state.count + action.payload
    }
}
})

export const {increment, decrement,reset,IncrementByAmount}= counterSlice.actions;
const counterReducer = counterSlice.reducer;
export default counterReducer;
