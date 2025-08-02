import React, { useState } from 'react';
import { useUpdateProductMutation } from './productApi';

const UpdatedForm = ({ product, setEditingProduct }) => {
  // initialize form data state with the passed product object
  const [formData, setFormData] = useState(product);
  
  // get the updateProduct function from the mutation hook
  const [updateProduct] = useUpdateProductMutation();

  // handle input changes and update the formData state dynamically
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    try {
      // call the updateProduct mutation with the updated data
      await updateProduct({ id: formData.id, ...formData });
      
      // close the editing form by setting editing product to null
      setEditingProduct(null);
    } catch (error) {
      // log any error that occurs during the update
      console.error('something went wrong:', error);
    }
  };

  return (
    <div>
      {/* form for editing product details */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label>title:</label>
          <input
            type="text"
            value={formData.title}
            name="title"
            onChange={handleChange}
            placeholder="title"
            className="border px-2 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label>description:</label>
          <input
            type="text"
            value={formData.descr}
            name="descr"
            onChange={handleChange}
            placeholder="description"
            className="border px-2 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label>price:</label>
          <input
            type="text"
            value={formData.price}
            name="price"
            onChange={handleChange}
            placeholder="price"
            className="border px-2 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label>category:</label>
          <input
            type="text"
            value={formData.category}
            name="category"
            onChange={handleChange}
            placeholder="category"
            className="border px-2 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        {/* submit button to save changes */}
        <button type="submit" className="border px-6 rounded bg-indigo-500 text-white">
          save
        </button>
        {/* cancel button to close form without saving */}
        <button
          type="button"
          onClick={() => setEditingProduct(null)}
          className="border px-4 ml-2 bg-gray-300 text-black"
        >
          cancel
        </button>
      </form>
    </div>
  );
};

export default UpdatedForm;
