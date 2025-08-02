import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { useAddProductMutation } from './productApi';

const ProductForm = () => {
  // state to hold new product form inputs
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    descr: ''
  })

  // get the addProduct mutation function
  const [addProduct] = useAddProductMutation()

  // handle input changes and update product state
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  // handle form submission to add a new product
  const handleSubmit = async (e) => {
    e.preventDefault() // prevent page reload
    
    // create a new product object with unique id using nanoid
    const newProduct = { ...product, id: nanoid() }
    console.log(newProduct) // for debugging

    try {
      // call addProduct mutation with new product data
      await addProduct(newProduct)
    } catch (error) {
      // log error if saving fails
      console.log('failed to save the product', error)
    }
  }

  return (
    <div>
      {/* form to add new product */}
      <form onSubmit={handleSubmit} className='space-y-2'>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={product.title}
            name='title'
            onChange={handleChange}
            placeholder='title'
            className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'
          />
        </div>
        <div>
          <label>description:</label>
          <input
            type="text"
            value={product.descr}
            name='descr'
            onChange={handleChange}
            placeholder='description'
            className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'
          />
        </div>
        <div>
          <label>price:</label>
          <input
            type="text"
            value={product.price}
            name='price'
            onChange={handleChange}
            placeholder='price'
            className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'
          />
        </div>
        <div>
          <label>category:</label>
          <input
            type="text"
            value={product.category}
            name='category'
            onChange={handleChange}
            placeholder='category'
            className='border px-2 focus:border-0 focus:ring-1 focus:outline-0 focus:ring-indigo-500'
          />
        </div>
        {/* submit button to add product */}
        <button type='submit' className='border px-6 rounded'>add product</button>
      </form>
    </div>
  )
}

export default ProductForm
