import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, IncrementByAmount, reset } from './CounterSlice';

const CounterView = () => {
    const {count } = useSelector((state) => state.counter);
    const dispatch = useDispatch()
  return (
    <div className='max-w-md mx-auto mt-8 p-3 flex flex-col h-h-sc
     justify-center items-center'>
        <h2>Count: {count}</h2>
       <div className='grid grid-cols-2 gap-5'>
         <button onClick={()=>{dispatch(increment())}}>increment</button>
        <button onClick={()=>{dispatch(decrement())}}>decrement</button>
        <button onClick={()=>{dispatch(reset())}}>reset</button>
        <button onClick={()=>{dispatch(IncrementByAmount(5))}}>IncrementBy-5</button>
       </div>
    </div>
  )
}

export default CounterView