import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { allprojectapi } from '../services/allapi'
import Header from '../components/Header'

function Projects() {

  const [allproject , setallproject]=useState([])
  const[searchkey , setsearchkey]=useState("")
  const [token,setToken]=useState("")

  // const getallproject = async ()=>{
  //   const result = await allprojectapi(searchkey)
  //   console.log(result.data);
    
  //   setallproject(result.data)
  //  }

  //  useEffect(()=>{
  //        getallproject()
  //  },[searchkey])
  const getallProject = async()=>{
    
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      const result = await allprojectapi(searchkey,reqHeader)
    // console.log(result)
    setallproject(result.data)
    }
  }
  useEffect(()=>{ 
    getallProject()
  },[searchkey])

  useEffect(()=>{ 
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <Header/>
    <div className="my-5">
      <h3 className='text-center'>All Projects</h3>
{!token?
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <img src="" alt="" />
            <h4 className=''>Please <Link to={'/register'} style={{textDecoration:'none'}}>Login</Link> to see more Projects</h4>

          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
         :
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex">
             <input type="text" onChange={(e)=>onchange(setsearchkey(e.target.value))} placeholder='Technologies' className='form-control shadow' />
             <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgray',marginTop:'11.5px',marginLeft:'-30px'}} />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        <div className="container-fluid p-md-5 mt-5">
          <div className="row">

            {allproject?.map((item)=>(
                 <div className="col-md-3 mb-4">
                 <Projectcard project={item}/>
               </div>
            ))}
            
           
            </div>    
       </div>
      </div>}
    </div>
    </>
  )
}

export default Projects