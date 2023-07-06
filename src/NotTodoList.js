import React, { useState, useEffect } from 'react';
import './NotTodoList.css';

const NotTodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('notTodoTasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notTodoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          text: inputValue,
          completed: false,
          priority: 0
        }
      ]);
      setInputValue('');
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleTaskRemoval = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleStartEditing = (index, text) => {
    setEditingIndex(index);
    setEditingValue(text);
  };

  const handleEditChange = (event) => {
    setEditingValue(event.target.value);
  };

  const handleSaveEdit = (index) => {
    if (editingValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editingValue;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePriorityChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = value;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'forgone') {
      return task.completed;
    } else if (filter === 'gone-for') {
      return !task.completed;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => b.priority - a.priority);

  return (
    <div className="not-todo-list-container">
      <h1>Not Todo List</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Add Task</button>
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="forgone">Forgone</option>
        <option value="gone-for">Gone For</option>
      </select>
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input type="text" value={editingValue} onChange={handleEditChange} />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
                <select
                  value={task.priority}
                  onChange={(event) => handlePriorityChange(index, parseInt(event.target.value))}
                >
                  <option value={0}>Low</option>
                  <option value={1}>Medium</option>
                  <option value={2}>High</option>
                </select>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletion(index)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                <button onClick={() => handleTaskRemoval(index)}>Remove</button>
                <button onClick={() => handleStartEditing(index, task.text)}>Edit</button>
                <span className="priority">Priority: {task.priority}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotTodoList;
