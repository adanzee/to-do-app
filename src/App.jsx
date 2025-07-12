import { useState } from "react";
import "./App.css";


export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: true },
    { id: 2, text: "Task 2", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState({ id: null, text: "" });
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const enableEditMode = (id, text) => {
    setEditMode({ id, text });
  };

  const saveEditedTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editMode.text } : task
    );
    setTasks(updatedTasks);
    setEditMode({ id: null, text: "" });
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all"
  });

  return (
    <>
    <div className="container">
      <h1 className="main">Mission: Complete the Impossible</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Let's pretend you'll do this..."
        />
        <button className = " plus-button"onClick={addTask}>+</button>
      </div>
      <div className="filter-dropdown">
        <label htmlFor="filter">Filter: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task">
            {editMode.id === task.id ? (
              <>
                <input className="edit-input"
                  type="text"
                  value={editMode.text}
                  onChange={(e) =>
                    setEditMode({ ...editMode, text: e.target.value })
                  }
                />
                <button className = "save-button"onClick={() => saveEditedTask(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  className={`checkmark ${task.completed ? "completed" : ""}`}
                  onClick={() => toggleCompletion(task.id)}
                >
                  ✔
                </span>
                <span
                  className={`task-text ${task.completed ? "completed" : ""}`}
                >
                  {task.text}
                </span>
                <button
                  className="edit"
                  onClick={() => enableEditMode(task.id, task.text)}
                >
                  ✏️
                </button>
                <button className="delete" onClick={() => removeTask(task.id)}>
                  ❌
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    
    </>
  );
}