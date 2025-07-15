import { createSlice } from "@reduxjs/toolkit";

 const counterSlice=createSlice ({
    name: 'counter',
    initialState: {count: 0},
    reducers:{
        increment:state =>{
           if(state.count < 100){
            state.count += 1
           }
        },
        decrement: state =>{
           if(state.count > 0){
            state.count -=1
           }
        },
        reset: state => {
            state.count= 0
        },
        IncrementByAmount: (state, actions)=>{
          const newValue=   state.count += actions.payload;
            state.count= newValue > 100 ? 100 : newValue;
        }
    }
})
export const {increment, decrement, reset, IncrementByAmount}= counterSlice.actions
export default counterSlice.reducer;