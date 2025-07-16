import React, { useState } from 'react'

const DeleteFuctions = () => {
    const[text, setText]=useState('') // state to store the input text
    const [items, setItems]=useState([]) // storing the list of added items

    // function to add text to the list
    const handleAddText=()=>{
    if(text.trim()){
        setItems([...items, text]) // added the new text to the existing list
        setText('') 
    }
    }

    // function to delete a specific text item
    const handleDeleteText=(textToDelete)=>{
        // filter out the item that matches the one to delete
        const filterItems=items.filter(items=> items !== textToDelete) 
        // update the list with remaining items
        setItems(filterItems)
    }
  return (
    <div className='w-2/4 mx-auto bg-green-600 text-white p-4 mt-12 text-center'>
        <h2 className='font-medium mb-4'>React Delete Functionality</h2>
        {/* input field to type text */}
        <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder='Ender Your Collage Name'className='border p-2 rounded border-sky-400 text-sm flex-grow focus:border-none focus:outline-0 focus:ring-1 focus:ring-indigo-700'/>
        {/* button to add typed text */}
        <button onClick={handleAddText} className='bg-green-900 px-2 py-2 rounded text-sm ml-0.5'>Add Text</button>
        {/* displaying the list of items */}
        <ul>
            {items.map((item, i)=>(
                <li key={i} className='flex items-center justify-between py-4'>
                   {/* showing the text */}
                     <p>{item}</p>
                     {/* delete button for each item */}
                    <button onClick={()=> handleDeleteText(item)} className='bg-red-700 cursor-pointer px-3 py-1 text-white rounded-md text-sm'>Delete</button>
                   
                </li>
            ))}
        </ul>
    </div>
  )
}

export default DeleteFuctions 