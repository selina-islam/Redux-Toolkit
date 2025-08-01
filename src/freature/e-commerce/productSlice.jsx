import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState= {
    product:[],
    isLoading: false,
    error: null
};
const BASE_URL= 'http://localhost:4000/products'
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get(BASE_URL)
    return res.data
})
export const deleteProducts = createAsyncThunk('products/deleteProducts', async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return id;
})
export const createProducts = createAsyncThunk('products/createProducts', async (product) => {
    const res = await axios.post(BASE_URL, product)
   return res.data
})
export const updateProducts = createAsyncThunk(
  'products/updateProducts',
  async (updatedProduct) => {
    const res = await axios.put(`${BASE_URL}/${updatedProduct.id}`, updatedProduct);
    return res.data;
  }
);



export const productSlice = createSlice({
    name:'product',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state)=>{
            state.isLoading= true;
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.product = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchProducts.rejected, (state,action)=>{
            state.isLoading = false;
            state.error ='Failed to fetch data'|| action.error.message
        })
        .addCase(deleteProducts.fulfilled, (state, action)=>{
            state.product = state.product.filter((product)=>
            product.id !== action.payload)
        })
        .addCase(createProducts.fulfilled, (state, action) => {
            state.product.push(action.payload)
        })
        .addCase(updateProducts.fulfilled, (state, action)=>{
            const index = state.product.findIndex(product => product.id === action.payload.id)
            if(index !== -1){
                state.product[index]= action.payload
            }
        })
    }
})

export default productSlice.reducer