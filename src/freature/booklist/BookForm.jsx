import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, bookEdit, clearSelectedBook } from './bookSlice'

const BookForm = () => {
    const [book, setBook  ]= useState({
        title: '',
        author:'',
        price: '',
        quantity: ''
    })
    const selectedBook = useSelector((state) => state.book.selectedBook)
    const dispatch = useDispatch()

const handleChange=(e)=>{
    const{name, value}= e.target;
    setBook((prevBook)=> ({...prevBook, [name]: value}))
    
}
useEffect(()=>{
    if(selectedBook){
        setBook(selectedBook)
    }
}, [selectedBook])

const handleSubmit=(e)=>{
    e.preventDefault(); 
   if(book.id){
     dispatch(bookEdit(book))
   }else{
     dispatch(addBook ({...book, id: nanoid()}))
   }
   resetForm()
}

const handleCancel =()=>{
    resetForm()
}

const resetForm=()=>{
    setBook({
        id:'',
        title:'',
        author:'',
        price:'',
        quantity:''
    })
dispatch(clearSelectedBook())

}

  return (
    <div>
        <h2 className='text-xl font-medium mb-4'>Book Form</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input onChange={handleChange} type="text" placeholder='Title' name='title' value={book.title} required  className='border p-1 rounded'/>
            <input onChange={handleChange} type="text" placeholder='Author' name='author' value={book.author} required  className='border p-1 rounded'/>
            <input onChange={handleChange} type="number" placeholder='Price' name='price' value={book.price} required  className='border p-1 rounded'/>
            <input onChange={handleChange} type="number" placeholder='Quantity' name='quantity' value={book.quantity} required  className='border p-1 rounded'/>
             {book.id && (
                <button type='button' onClick={handleCancel} className='border'>Cancel</button>
            )}
            <button className='bg-blue-200 py-1 cursor-pointer' type='submit'>
                {book.id ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    </div>
  )
}

export default BookForm