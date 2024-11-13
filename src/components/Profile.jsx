import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateprofileapi } from '../services/allapi';
import { Collapse } from 'react-bootstrap';


function Profile() {
  const [userdetails , setuserdetails]=useState({
    username:"",
    email:"",
    password:"",
    profile:"",
    github:"" ,
   linkedin:""
  })
  const[open ,setopen]=useState(false)
  const[updateresponse , setupdateresponse]=useState({})
  const[preview,setpreview]=useState()
  console.log(userdetails);
  const [existingimg,setexistingimg]=useState("")
  const handlefile = (e)=>{
    setuserdetails({...userdetails,profile:e.target.files[0]})
  }
   
  const handleupdate=async()=>{
    const{username,email,password,profile,github,linkedin}=userdetails
    if(!github ||!linkedin){
        toast.info("please fill both the input box")
    }
    else{
      const reqbody=new FormData()
      reqbody.append("username",username)
      reqbody.append("email",email)
      reqbody.append("password",password)
      reqbody.append("github",github)
      reqbody.append("linkedin",linkedin)
     preview? reqbody.append("profile",profile):reqbody.append("profile",existingimg)

    const token=sessionStorage.getItem("token")
    if(preview){
      const reqheader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
    }
    const result = await updateprofileapi(reqbody,reqheader)
    console.log(result);
    if(result.status==200){
      toast.success("profile updated successfully")
      sessionStorage.setItem("existinguser",JSON.stringify(result.data))
      setupdateresponse(result)
      
     
    }
    else{
      toast.error("something went wrong")
     
    }
    
   }
    else{
      
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateprofileapi(reqbody,reqheader)
        console.log(result);
        if(result.status==200){
          toast.success("profile updated successfully")
        sessionStorage.setItem("existinguser",JSON.stringify(result.data))
          setupdateresponse(result)
          
        }
        else{
          toast.error("something went wrong")
          
        }
        

      }

    }
  }

  useEffect(()=>{
    if(userdetails.profile){
      setpreview(URL.createObjectURL(userdetails.profile))
    }
  },[userdetails.profile])
  console.log(preview);
  console.log(existingimg);
  
  
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
            const user =JSON.parse(sessionStorage.getItem("existinguser"))
            console.log(user);
            setuserdetails({...userdetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
            setexistingimg(user.profile)
            
    }
    
  },[updateresponse])
  
  return (
    <div  onMouseLeave={()=>setopen(false)} onMouseEnter={()=>setopen(true)}  className='p-4 shadow'>
      <div className='d-flex justify-content-between'>
        <h3 style={{color:'rgb(62,179,24)'}}>Profile</h3>
        <button className='btn' onClick={()=>setopen(!open)}  style={{borderColor:'rgb(160,98,192)', color:'rgb(160,98,192)'}}> {open? <FontAwesomeIcon icon={faAngleUp}  />:<FontAwesomeIcon icon={faAngleDown} />}</button>
      </div>
<Collapse in={open}>
  <div  >
    
          <div className="d-flex justify-content-center align-items-center flex-column mt-4">
            <label htmlFor="profileimage" className='mb-4 d-flex justify-content-center align-items-center '>
                <input id='profileimage' type="file" onChange={(e)=>handlefile(e)} style={{display:'none'}} />
              {existingimg==""?
               <img src={preview?preview:"https://icon-library.com/images/profile-picture-icon/profile-picture-icon-0.jpg"}  style={{borderRadius:'50%',width:'175px',height:'175px'}} alt=""/> 
               :
               <img style={{borderRadius:'50%',width:'175px',height:'175px'}} src={preview?preview:`${serverUrl}/upload/${existingimg}`}  alt="" />}
    
                
            </label>
    
            <div className='w-100'>
                <div className="mb-3">
                    <input type="text" className='form-control' onChange={(e)=>setuserdetails({...userdetails,github:e.target.value})} value={userdetails.github}  placeholder='github'/>
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control'onChange={(e)=>setuserdetails({...userdetails,linkedin:e.target.value})} value={userdetails.linkedin}  placeholder='Linkedin'/>
                </div>
                <div className="mb-3">
                    <button onClick={handleupdate} className='btn btn-success w-100'>Update</button>
                </div>
            </div>
          </div>
          
  </div>
</Collapse>
      <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>

    </div>
  )
}

export default Profile