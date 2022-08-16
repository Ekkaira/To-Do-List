import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

// to get localStorage data.
const getLocalItems = () => {
  let storageData = localStorage.getItem("todoData");
  console.log(storageData);
  if (storageData) {
    return JSON.parse(localStorage.getItem("todoData"));
  } else {
    return [];
  }
};

function App() {
  const [items, setItems] = useState(getLocalItems());

  // added "Enter" keypress functionality.
  function handleKeyPress(event) {
    return setItems((prevInputText) => {
      return [...prevInputText, event.target.value];
    });
  }

  // add items.
  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
  }

  // delete items.
  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  // set localStorage data.
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} onKeyPress={handleKeyPress} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
