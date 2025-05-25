import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail"
import { GlobalProvider } from "./contexts/GlobalContext";


function App() {


  return (

    <GlobalProvider>
      <BrowserRouter>

        <div className="container">
          <nav className="navbar">
            <NavLink className={'link'} to='/'> Lista Task</NavLink>
            <NavLink className={'link'} to='/add'> Aggiungi Task</NavLink>
          </nav>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/add' element={<AddTask />} />
            <Route path='/task/:id' element={<TaskDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>

  )
}

export default App
