import React from 'react'
import { useDeleteProductMutation, useGetProductQuery } from './productApi'
import ProductForm from './ProductForm'
import { useState } from 'react'
import UpdatedForm from './UpdatedForm'

const ProductsViews = () => {
  // state to hold the product which is currently being edited
  const [editingProduct, setEditingProduct] = useState(null)
  
  // fetch products data, loading state, and error from the api query
  const { data, isLoading, error } = useGetProductQuery()
  
  // get the mutation function to delete a product
  const [deleteProduct] = useDeleteProductMutation()

  // handle delete button click by calling deleteProduct mutation
  const handleDelete = async (id) => {
    await deleteProduct(id)
  }
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* component to add new product */}
      <ProductForm />

      <h3 className="text-2xl font-bold mb-4 text-center">list of products</h3>

      {/* show loading text when data is being fetched */}
      {isLoading && <p className="text-blue-500 text-center">loading...</p>}

      {/* show error message if fetching data fails */}
      {error && (
        <p className="text-red-500 text-center">
          {error.message || 'something went wrong!'}
        </p>
      )}

      {/* show product list if data is loaded and no error */}
      {!isLoading && !error && data && data.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* map over products array and display each product */}
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
                {/* delete button */}
                <button onClick={() => handleDelete(product.id)} className='border px-4 cursor-pointer'>
                  delete
                </button>
                {/* edit button, sets editing product state */}
                <button onClick={() => setEditingProduct(product)} className='border px-4 cursor-pointer'>
                  edit
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* show update form when editingProduct is set */}
      {editingProduct && <UpdatedForm product={editingProduct} setEditingProduct={setEditingProduct} />}
    </div>
  )
}

export default ProductsViews
