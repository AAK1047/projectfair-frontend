import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { remuserprojectapi, userprojectapi } from '../services/allapi'
import { Link } from 'react-router-dom'
import { addresponsecontext, editresponsecontext } from '../context/Contextshare'

function Myproject() {

  const {addresponse}=useContext(addresponsecontext)

  const [userprojects ,setuserprojects]=useState([])

  const [removestatus , setremovestatus]=useState({})
  const {editresponse}=useContext(editresponsecontext)

  const getuserprojects=async ()=>{

    if(sessionStorage.getItem("token")){
    const token=sessionStorage.getItem("token")
      
      const reqheader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result =await userprojectapi(reqheader)

      
      setuserprojects(result.data)
    }
    console.log(userprojects);
    
    

  }

  const handleDelete= async(id)=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      
      const reqheader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result =await remuserprojectapi(id,reqheader)
      console.log(result);
      if(result.status==200){
        setremovestatus(result)
         alert(result.data)
      }
      else{
        alert('something went wrong')
      }
      
    }

  }


  useEffect(()=>{
    getuserprojects()
   

  },[addresponse,removestatus,editresponse])

  return (
    <div className='p-4 shadow w-100'>
      <div className='d-flex justify-content-between'>
        <h3 className='text-success'>My project</h3>
        <Addproject/>
      </div>
{userprojects.length>0?

    userprojects?.map((item)=>(
     
      <div className='d-flex p-3 bg-light mt-4 rounded-2 align-items-center'>
        <h4>{item.title}</h4>
        <div className='ms-auto d-flex'>
          <Edit projects={item}/>
         <Link to={item.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='text-warning mx-3' /></Link>
        <Link to={item.github} target='_blank'>  <FontAwesomeIcon icon={faGithub} className='text-success mx-3' /></Link>
          <FontAwesomeIcon  onClick={()=>handleDelete(item._id)} icon={faTrashCan} className='text-danger mx-3' />
        </div>
      </div>
    ))
      
       :
       <h4 className='text-warning text-center mt-5'>No project added yet</h4>
}
    </div>
  )
}

export default Myproject