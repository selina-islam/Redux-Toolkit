import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, IncrementByAmount, reset } from '../redux/feature/counter/counterSlice'

const CounterApp = () => {
    const counter= useSelector((state)=> state.counter.count)
    const dispatch= useDispatch()
  return (
    <div className='bg-amber-900 p-6 max-w-1/2 mx-auto mt-20'>
        <h1 className='text-center text-white text-3xl mb-4'>Counter App</h1>
        <p className='text-white text-center underline'>count: {counter}</p>
        {counter >= 100 && (<p className="text-blue-600 mt-2 text-sm  text-center">maximum count is 100</p>)}
       <div className='lg:flex gap-4  mt-4 items-center justify-center'>
         <button onClick={()=> dispatch(increment())} className='px-4 py-2 bg-blue-500 text-white m-3'>Increment</button>
        <button onClick={()=> dispatch(decrement())} className='px-4 py-2 bg-blue-500 text-white m-3'>Decrement</button>
        <button onClick={()=> dispatch(reset())} className='px-4 py-2 bg-blue-500 text-white m-3'>Reset</button>
        <button onClick={()=> dispatch(IncrementByAmount(5))} className='px-4 py-2 bg-blue-500 text-white m-3'>IncrementByAmount</button>
       </div>
    </div>
  )
}

export default CounterApp