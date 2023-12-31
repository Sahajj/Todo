import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './componenets/CreateTodo'
import { Todos } from './componenets/Todos'


function App() {
  const [todos, setTodos] = useState([]);

  // wrong way
  // useEffect hook to solve all loops in here
  fetch("http://localhost:3000/todos")
    .then(async function (res) {
      const json = await res.json();
      setTodos(json.todos)
    })

    
  
  return (
      <div>
        <CreateTodo></CreateTodo>
        <Todos></Todos>
      </div>
    )
}

export default App
