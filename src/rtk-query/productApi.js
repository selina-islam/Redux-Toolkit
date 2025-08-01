import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/'
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => (
        {
            getProduct: builder.query({
                query:()=> 'products',
                 providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product", id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
            }),
             deleteProduct: builder.mutation({
        query: (id)=> ({
            url:`products/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:(result, error, id)=>[
            {
                type:'Product', id
            }
        ]
    }),
             addProduct: builder.mutation({
        query: (body)=> ({
            url:`products/`,
            method:'POST',
            body
        }),
        invalidatesTags:[
            {
                type:'Product', id:'List'
            }
        ]
    }),
             updateProduct: builder.mutation({
        query: ({id, ...updatedProduct})=> ({
            url:`products/${id}`,
            method:'PUT',
            body: updatedProduct
        }),
        invalidatesTags:(result, error, {id})=>[
            {
                type:'Product', id
            }
        ]
    })
})   
})

export const {useGetProductQuery, useDeleteProductMutation, useAddProductMutation, useUpdateProductMutation}= productApi