import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, fetchProducts, updateProducts } from "./productSlice";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const { product, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product); // set product to edit
  };

  const clearEdit = () => {
    setEditProduct(null); // reset edit
  };

  return (
    <div className="max-w-5/6 mx-auto text-center p-6">
      {/* ProductForm gets props to handle edit mode */}
      <ProductForm editProduct={editProduct} clearEdit={clearEdit} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && product?.length > 0 && (
        <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {product.map((product) => (
            <article
              key={product.id}
              className="bg-gray-400 p-4 rounded hover:scale-105 transition duration-300"
            >
              <p className="text-2xl font-bold mb-2">{product.title}</p>
              <p className="font-extralight py-1 text-justify">
                {product.descr}
              </p>
              <p className="italic font-sans text-slate-500">
                ${product.price}
              </p>
              <p className="font-semibold">Category: {product.category}</p>
             
              <button
                onClick={() => dispatch(deleteProducts(product.id))}
                className="border px-4 rounded mt-1 cursor-pointer"
              >
                delete
              </button>
              <button
                onClick={() => handleEdit(product)}
                className="border px-4 rounded mt-1 cursor-pointer ml-2"
              >
                Edit
              </button>
            </article>
          ))}
          
        </section>
      )}
    </div>
  );
};

export default ProductList;
