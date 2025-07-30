import { createSlice } from "@reduxjs/toolkit";

const initialState={book:[
    {id:1,title:'Book One',author:'Author One',price:10,quantity:5},
    {id:2,title:'Book Two',author:'Author Two',price:15,quantity:3},
    {id:3,title:'Book Three',author:'Author Three',price:20,quantity:2},
    {id:4,title:'Book Four',author:'Author Four',price:25,  quantity:4},
    {id:5,title:'Book Five',author:'Author Five',price:30, quantity:1}
],
    selectedBook: null,
}

export const bookSlice= createSlice({
    name: 'book',
    initialState,
    reducers:{
        // Action to delete a book
        // It takes an id as payload and filters out the book with that id  
        bookDelete: (state, action)=> {
            const id=  action.payload;
            state.book = state.book.filter((bookItem)=> bookItem.id !== id)
        },
        // Action to add a new book
        // It takes a book object as payload and adds it to the book array
        addBook: (state, action)=>{
            state.book.push(action.payload)
        },
        bookEdit: (state, action)=>{
            const index = state.book.findIndex((bookItem)=> bookItem.id === action.payload.id)

            if(index !== -1){
                state.book[index]= action.payload
            }
        },
        setSelectedBook:(state, action) => {
            state.selectedBook = action.payload
        },
        clearSelectedBook: (state, action) => {
            state.selectedBook= null
        }
    }
})

export const {bookDelete, addBook, bookEdit, setSelectedBook, clearSelectedBook}= bookSlice.actions
 const bookReducer = bookSlice.reducer;
 export default bookReducer