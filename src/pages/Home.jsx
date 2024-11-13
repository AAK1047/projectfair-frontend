import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/developer.avif'
import { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { homeprojectapi } from '../services/allapi'

function Home() {

   const [islogin , setislogin]=useState(false)

   const [homeproject , sethomeproject]=useState([])

   const gethomeproject = async ()=>{
    const result = await homeprojectapi()
    console.log(result.data);
    
    sethomeproject(result.data)
   }

   useEffect(()=>{
     gethomeproject()
    if(sessionStorage.getItem("token")){
      setislogin(true)
    }
    else{
      setislogin(false)
    }

   },[])


  return (

  <>
      <div style={{height:'100vh'}} className='bg-success p-5'>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-md-6">
            <h1 style={{fontSize:'70px',color:'white'}}>Project Fair</h1>
              <p>One stop destination for all software development projects</p>
              
         {!islogin?   <Link to={'/login'}>
                <button className='btn text-light'>Get Started 
                <FontAwesomeIcon icon={faArrowRight} /></button>
            </Link>
            :
           <Link to={'/dashboard'}>
                <button className='btn text-light'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button>
    
           </Link>
           }
            </div>
            <div className="col-md-6">
            
              <img src={photo} alt="no image" className='w-75' />
            </div>
          </div>
        </div>
  
      </div>

      <div>
        <h1 className='text-center my-5' >Explore Our Projects</h1>
        <div className="container">
        <div className="row">

         {homeproject?.map((item)=>(
            <div className="col-md-4">
            <Projectcard project={item}/>
          </div>
         
         ))}
          

        </div>
        </div>
       <Link to={'/projects'}> <p className='text-center my-4'>See more projects</p></Link>
      </div>
  </>
  )
}

export default Home