import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
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
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>

  )
}

export default App
