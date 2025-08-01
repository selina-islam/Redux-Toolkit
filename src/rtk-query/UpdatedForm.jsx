import React, { useState } from 'react';
import { useUpdateProductMutation } from './productApi';

const UpdatedForm = ({ product, setEditingProduct }) => {
  const [formData, setFormData] = useState(product);
  const [updateProduct] = useUpdateProductMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await updateProduct({ id: formData.id, ...formData });
       setEditingProduct(null)

      
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label>Title:</label>
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
          <label>Description:</label>
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
          <label>Price:</label>
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
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            name="category"
            onChange={handleChange}
            placeholder="category"
            className="border px-2 focus:ring-1 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <button type="submit" className="border px-6 rounded bg-indigo-500 text-white">
          Save
        </button>
        <button
  type="button"
  onClick={() => setEditingProduct(null)}
  className="border px-4 ml-2 bg-gray-300 text-black"
>
  Cancel
</button>
      </form>
    </div>
  );
};

export default UpdatedForm;
