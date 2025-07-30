import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookDelete, setSelectedBook } from './bookSlice';
import BookForm from './BookForm';

const BookList = () => {
      const book  = useSelector((state) => state.book.book);
      const dispatch = useDispatch()
      // Function to handle book deletion
 const handleDelete= (id)=>{
    dispatch(bookDelete(id))
 }

 const handleEdit= (book)=>{
    dispatch(setSelectedBook(book))
 }

  return (
    <div className='bg-blue-100 w-5/6 mx-auto text-center p-4 mt-12 rounded'>
        <BookForm/>
        <h2 className='text-xl font-medium mb-2 text-center'>Book List</h2>
       {book && book.length > 0 ? (
         <ul>
            {book.map((bookItem)=>(
                <li key={bookItem.id} className='flex justify-between'>
                   <p> {bookItem.title} {bookItem.author} - ${bookItem.price} -{bookItem.quantity} pcs</p>
                    <div>
                      <button onClick={()=>{handleDelete(bookItem.id)}} className='border m-2 px-2 rounded text-red-500 cursor-pointer'>Delete</button>
                    <button onClick={()=>{handleEdit(bookItem)}} className='border m-2 px-2 rounded text-green-500 cursor-pointer'>Edit</button>
                    </div>
                </li>

            ))}
        </ul>
       ):(<p>No book found</p>)}
    </div>
  )
}

export default BookList