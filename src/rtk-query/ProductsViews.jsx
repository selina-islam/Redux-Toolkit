import React from 'react'
import { useDeleteProductMutation, useGetProductQuery } from './productApi'
import ProductForm from './ProductForm'
import { useState } from 'react'
import UpdatedForm from './UpdatedForm'

const ProductsViews = () => {
    const [editingProduct, setEditingProduct]= useState(null)
    const {data, isLoading, error} = useGetProductQuery()

    const [deleteProduct]=useDeleteProductMutation()
  
    const handleDelete=async(id)=>{
      await deleteProduct(id)
    }
   
  return (
    <div className="max-w-6xl mx-auto p-4">
        <ProductForm/>
  <h3 className="text-2xl font-bold mb-4 text-center">List of Products</h3>

  {isLoading && <p className="text-blue-500 text-center">Loading...</p>}

  {error && (
    <p className="text-red-500 text-center">
      {error.message || 'Something went wrong!'}
    </p>
  )}

  {!isLoading && !error && data && data.length > 0 && (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => (
        <article
          key={product.id}
          className="bg-white shadow-md rounded-md p-4 border hover:shadow-lg transition duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.title}
          </h3>
          <p>{product.descr}</p>
          <p>{product.price}</p>
          <h4>{product.category}</h4>
          <div>
            <button onClick={()=> handleDelete(product.id)} className='border px-4 cursor-pointer'>Delete</button>
            <button onClick={()=> setEditingProduct(product)} className='border px-4 cursor-pointer'>Edit</button>
          </div>
        </article>
      ))}
    </section>
  )}
  {editingProduct && <UpdatedForm product={editingProduct} setEditingProduct={setEditingProduct}/>}
</div>

  )
}

export default ProductsViews