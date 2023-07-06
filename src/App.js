import React from 'react';
import TodoList from './TodoList';
import NotTodoList from './NotTodoList';

const App = () => {
  return (
    <div>
      <TodoList />
      <NotTodoList />
    </div>
  );
};

export default App;
