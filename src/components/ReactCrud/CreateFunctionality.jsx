import React, { useState } from "react";

const CreateFunctionality = () => {
  const [text, setText] = useState(""); // state to hold the current text input
  const [items, setItems] = useState([]); // state to store the list of added items

  // add text function
  const addText = () => {
    if (text.trim()) {
      setItems([...items, text]);
      setText("");
    }
  };
  return (
    <div className="w-1/2 mx-auto p-6 bg-amber-100 mt-12 text-center">
      <h2 className="text-center mb-2 font-bold underline underline-offset-4">
        React Create Operation
      </h2>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        value={text}
        placeholder="Enter Your Name"
        className="border border-gray-400 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-none rounded"
      />
      <button
        onClick={addText}
        className="text-sm bg-blue-600 px-4 py-3 ml-0.5 rounded text-white cursor-pointer hover:bg-blue-700 transition transform duration-200"
      >
        Add
      </button>
      <ul>
        {items.map((item, i) => (
          <li key={i}> {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateFunctionality;
