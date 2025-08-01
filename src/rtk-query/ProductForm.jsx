
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { useAddProductMutation } from './productApi';

const ProductForm = () => {
    const [product, setProduct]= useState({
        title:'',
        price:'',
        category:'',
        descr:''
    })
   
    const [addProduct] = useAddProductMutation()



    const handleChange=(e)=>{
        setProduct({
            ...product,[e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
         e.preventDefault();

         console.log({...product, id:nanoid()})
         try{
          await addProduct({...product, id:nanoid()})
         }catch(error){
          console.log('failed to save the product', error)
         }
};

  return (
    <div>
        <form onSubmit={handleSubmit} className='space-y-2'>
           <div>
            <label>Title:</label>
            <input type="text" value={product.title} name='title' onChange={handleChange} placeholder='title' className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'/>
           </div>
           <div>
            <label>Description:</label>
            <input type="text" value={product.descr} name='descr' onChange={handleChange} placeholder='description' className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'/>
           </div>
           <div>
            <label>Price:</label>
            <input type="text" value={product.price} name='price' onChange={handleChange} placeholder='price' className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'/>
           </div>
           <div>
            <label>Category:</label>
            <input type="text" value={product.category} name='category' onChange={handleChange} placeholder='category' className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'/>
           </div>
           <button type='submit' className='border px-6 rounded'> add product</button>
           
        </form>
    </div>
  )
}

export default ProductForm