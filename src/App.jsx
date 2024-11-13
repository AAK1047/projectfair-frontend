
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginresponsecontext } from './context/Contextshare'


function App() {
  const {loginresponse}=useContext(loginresponsecontext)

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={loginresponse?<Projects/>:<Pagenotfound/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register={true}/>}/>
        <Route path='/Dashboard' element={loginresponse?<Dashboard/>:<Pagenotfound/>}/>
        <Route path='*' element={<Pagenotfound/>}/>

        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
