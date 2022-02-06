import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTodos = () => {
    fetch(`http://localhost:4000/api/todos?search=${searchQuery}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setTodos(data.data.todos))
      .catch(err => console.log(err))
  }

  const addTodo = () => {
    fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: todo
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(fetchTodos())
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos();
  }, [searchQuery])

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" placeholder="search" onChange={(e) => setSearchQuery(e.target.value)} />
      <input type="text" placeholder="Add Todo" onChange={e => setTodo(e.target.value)}/>
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => <li>{todo.text}</li>)}
      </ul>
    </div>
  );
}

export default App;
