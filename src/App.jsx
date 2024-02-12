import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Footer from './Components/Footer'
import tokenAuthentication from './ContextAPI/tokenAuthentication'
import { useContext } from 'react'

function App() {
  // const {isAutherised,setIsAutherised} = useContext(tokenAuthentication)


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        { <Route path='/dashboard' element={ /*isAutherised? */<Dashboard/>/*:<Home/>*/} /> }
        <Route path='/projects' element={/* isAutherised?*/<Project/>/*:<Home/>*/ } />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
