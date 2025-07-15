import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  loadFromStorage
} from "../redux/feature/Todo/todoSlice";

const TodoApp = () => {
  const [text, setText] = useState(""); // state for input text
  const [editId, setEditId] = useState(null); // state to hold id of todo being edited
  const todos = useSelector((state) => state.todo); // select todos from redux state
  const dispatch = useDispatch(); // initialize dispatch

  // load todos from localStorage when component mounts
  useEffect(() => {
    const SavedTodo = JSON.parse(localStorage.getItem("todo")) || [];
    if (SavedTodo.length > 0) {
      dispatch(loadFromStorage(SavedTodo));
    }
  }, [dispatch]);

  // save todos to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  // handle adding or editing todo
  const handleAdd = () => {
    if (text.trim()) {
      if (editId) {
        dispatch(removeTodo(editId)); // remove old todo before re-adding updated one
        dispatch(addTodo({ text: `${text} (edited)` }));
        setEditId(null); // clear edited state
      } else {
        dispatch(addTodo({ text })); // add new todo
      }
      setText(""); // clear input field
    }
  };

  // set todo text and id in edit mode
  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="md:w-1/4 mx-auto">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold mb-5">Todo App</h2>
        <input
          onChange={(e) => setText(e.target.value)} // update text input
          value={text}
          type="text"
          placeholder="enter your todo list"
          className="flex-grow border border-gray-300 focus:outline-0 px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd} // call add/edit handler
          className="bg-blue-700 py-2 mx-1 p-2 text-white text-sm rounded cursor-pointer"
        >
          {editId ? "Edit Todo" : "Add Todo"}
        </button>
      </div>

      <ul className="bg-amber-300 p-6 space-y-4 rounded">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center rounded-lg shadow-md p-2 ${
              todo.completed
                ? "bg-green-300 line-through text-gray-500"
                : "bg-gray-200"
            }`}
            onClick={() => dispatch(toggleTodo(todo.id))} // toggle completed status on click
          >
            <div>
              <p>{todo.text}</p>
              <span>{new Date(todo.id).toLocaleString()}</span> {/* show created date */}
            </div>
            <div className="ml-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent toggle when clicking edit
                  handleEdit(todo); // set todo in edit mode
                }}
                className="bg-blue-600 px-3 py-1 text-white cursor-pointer rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(removeTodo(todo.id))} // delete todo
                className="bg-red-600 px-3 py-1 text-white cursor-pointer rounded-md"
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

export default TodoApp;
