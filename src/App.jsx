import { Routes, Route, NavLink } from "react-router-dom";


import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";

console.log('✅ AddTask:', AddTask);
console.log('✅ TaskList:', TaskList);

function App() {


  return (


    <div>
      <nav className="navbar">
        <NavLink to='/'> Lista Task</NavLink>
        <NavLink to='/add'> Aggiungi Task</NavLink>

      </nav>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/add' element={<AddTask />} />
      </Routes>
    </div>


  )
}

export default App
