import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

// create an API slice with endpoints for CRUD operations on products
export const productApi = createApi({
  // unique key for reducer slice
  reducerPath: 'productsApi',

  // base url for all api requests
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),

  // tag types for cache invalidation and data refetching
  tagTypes: ['Product'],

  // define all endpoints (queries and mutations)
  endpoints: (builder) => ({
    // fetch all products
    getProduct: builder.query({
      query: () => 'products', // GET request to /products

      // tags to mark each product by id, plus a "LIST" tag for the whole list
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product", id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // delete a product by id
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,  // DELETE request to /products/:id
        method: 'DELETE',
      }),
      // invalidate the specific product's cache after deletion
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id }
      ],
    }),

    // add a new product
    addProduct: builder.mutation({
      query: (body) => ({
        url: `products/`,  // POST request to /products
        method: 'POST',
        body,              // product data sent in body
      }),
      // invalidate the whole product list cache so it refetches
      invalidatesTags: [
        { type: 'Product', id: 'LIST' }
      ],
    }),

    // update an existing product by id
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `products/${id}`,  // PUT request to /products/:id
        method: 'PUT',
        body: updatedProduct,    // updated product data
      }),
      // invalidate cache for the updated product id
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id }
      ],
    }),
  })
})

// export auto-generated hooks for each endpoint to use in components
export const {
  useGetProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation
} = productApi;
