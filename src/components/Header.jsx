import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import {  Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginresponsecontext } from '../context/Contextshare'

function Header() {
  const[token ,settoken]=useState("")
  const navigate=useNavigate()
  const {setloginresponse}=useContext(loginresponsecontext)
  const handlelogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existinguser")
    setloginresponse(false)
    navigate('/')
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      settoken(sessionStorage.getItem("token"))
     
    }
  },[])
  return (
    <>
    <Navbar className="bg-success px-5 rounded-0 shadow border-0">
        
        <Navbar.Brand>
         <Link to={'/'} style={{textDecoration:'none'}}>
            <span className='text-light me-3 fs-3'><FontAwesomeIcon icon={faStackOverflow} /></span>
            <span className='text-light fs-3'>Project fair</span>
         </Link>
        </Navbar.Brand>
        {token&&  <button className='btn btn-warning ms-auto rounded-0' onClick={handlelogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
    </Navbar>

    </>
  )
}

export default Header