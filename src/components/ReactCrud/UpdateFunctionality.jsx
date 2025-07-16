import React, { useState } from "react";

const UpdateFunctionality = () => {
  // State to hold the current value of the input field
  const [name, setName] = useState("");

  // State to hold the list of names (each with id, name, and edited flag)
  const [nameList, setNameList] = useState([]);

  // State to track which name is currently being edited (by id)
  const [editId, setEditId] = useState(null);

  // State to toggle the "completed" styling (strikethrough effect)
  const [complete, setComplete] = useState(false);

  // Function to handle adding or updating a name
  const handleAddName = () => {
    if (name.trim()) {
      if (editId) {
        // Update mode: edit an existing name
        setNameList((prev) =>
          prev.map((item) =>
            item.id === editId
              ? { ...item, name, edited: true } // Update name and mark as edited
              : item
          )
        );
        setEditId(null); // Exit edit mode
      } else {
        // Add mode: add a new name
        setNameList([
          ...nameList,
          { id: Date.now(), name, edited: false }, // New item with default edited = false
        ]);
      }
      setName(""); // Clear the input field
    }
  };

  // Function to handle clicking the "Edit" button
  const handleEditName = (item) => {
    setName(item.name); // Pre-fill the input with the selected name
    setEditId(item.id); // Set the id for edit mode
  };

  // Function to toggle the completed state (applies to all names)
  const toggleText = () => {
    setComplete(!complete); // Toggle between completed and normal view
  };

  // Function to delete a name by id
  const handleDeleteName = (id) => {
    setNameList(nameList.filter((list) => list.id !== id)); // Remove from the list
  };

  return (
    <div className="bg-blue-100 w-5/6 mx-auto text-center p-4 mt-12 rounded">
      <h2 className="text-xl font-medium mb-4">React Update Functionality</h2>

      {/* Input field to type the name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Add Your NickName"
        className="border p-2 text-sm rounded focus:outline-0 focus:border-none focus:ring-1 focus:ring-indigo-600"
      />

      {/* Button to Add or Update, based on edit mode */}
      <button
        onClick={handleAddName}
        className="bg-blue-500 p-2 text-sm text-white ml-0.5 rounded"
      >
        {editId ? "Update Name" : "Add Name"}
      </button>

      {/* List of added names */}
      <ul>
        {nameList.map((n) => (
          <li
            key={n.id}
            className={`flex items-center justify-between p-4 ${
              complete ? "line-through text-gray-500" : ""
            }`}
          >
            {/* Display name and "Edited" tag if applicable */}
            <p onClick={toggleText}>
              {n.edited && (
                <span className="text-green-500 text-sm mr-2">Edited</span>
              )}
              <span>{n.name}</span>
            </p>

            {/* Edit and Delete buttons */}
            <div className="space-x-4">
              <button
                onClick={() => handleEditName(n)}
                className="text-green-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteName(n.id)}
                className="text-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateFunctionality;
