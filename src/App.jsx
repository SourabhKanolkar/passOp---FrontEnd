
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from './components/Login'
import { Route,Routes } from 'react-router-dom'
import About from './components/About'
import Register from './components/Register'

function App() {


  return (
    <>
         
  
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Manager />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
          </Routes>

   


    </>
  )
}

export default App
