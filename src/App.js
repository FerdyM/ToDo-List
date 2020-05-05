import React from 'react';
import Nav from './components/Nav/Nav';
import ToDoList from './components/ToDoList/ToDoList'
import './App.css'



function App() {
  return (
    <div className="App">
      <Nav />
      <ToDoList />
    </div>
  );
}

export default App;
