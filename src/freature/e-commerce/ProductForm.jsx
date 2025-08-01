import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProducts, updateProducts } from './productSlice'

const ProductForm = ({ editProduct, clearEdit }) => {
    const [product, setProduct]= useState({
        title:'',
        price:'',
        category:'',
        descr:''
    })
    const dispatch = useDispatch()


    // when edit product change, populate the form
    useEffect(()=>{
      if(editProduct){
        setProduct(editProduct)
      }else{
        setProduct({
           title:'',
        price:'',
        category:'',
        descr:''
        })
      }
    },[editProduct])

    const handleChange=(e)=>{
        setProduct({
            ...product,[e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
         e.preventDefault();
         if(editProduct){
         dispatch(updateProducts(product))
         clearEdit()
  }else{
    dispatch(createProducts({...product, id: nanoid()}))
  } 
  // Reset form after submit 
  setProduct({
    title: '',
    price: '',
    category: '',
    descr: ''
  });
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
           <button type='submit' className='border px-6 rounded'> {editProduct ? 'Update Product' : 'Add Product'}</button>
            {editProduct && (
                <button
                  type="button"
                  onClick={clearEdit}
                  className="border px-6 ml-2"
                >
                  Cancel
                </button>
              )}
        </form>
    </div>
  )
}

export default ProductForm