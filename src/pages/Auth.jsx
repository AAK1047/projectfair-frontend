import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { json, Link,  useNavigate } from 'react-router-dom'
import { loginapi, registerapi } from '../services/allapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginresponsecontext } from '../context/Contextshare'

function Auth({register}) {
  const navigate = useNavigate()
  const [userdetails , setuserdetails]=useState({
    username:"",
    email:"",
    password:""
  })
  const {setloginresponse}=useContext(loginresponsecontext)

  console.log(userdetails);

  const handleregister = async()=>{
    const {username , email ,password}=userdetails
    if(!username , !email ,!password){
      toast.info('please fill the form completely')
    }
    else{
      const result =await registerapi(userdetails)
      console.log(result);

      if(result.status==200){
        toast.success('registration succesfull')
        setuserdetails({
          username:"",
           email:"",
           password:""
        })
        navigate('/login')
      }
      else if(result.status==406){
            toast.warning(result.response.data)
      }
      else{
        toast.error('something went wrong')
       
        
      }
      
    }
  }

  const handlelogin = async ()=>{
    const {email ,password}=userdetails
    if(!email ,!password){
      toast.info('please fill the form completely')
    }
    else{
      const result =await loginapi(userdetails)
      console.log(result);

      if(result.status==200){
        toast.success('login succesfull')
        setloginresponse(true)
        setuserdetails({
          username:"",
          email:"",
          password:""
        })
       
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        
        setTimeout(()=>{
        navigate('/')
          
        },2000)
      }
      else if(result.status==406){
            toast.warning(result.response.data)
            setuserdetails({
              username:"",
              email:"",
              password:""
            })
      }
      else{
        toast.error('something went wrong')
        setuserdetails({
          username:"",
          email:"",
          password:""
        })
        
      }
      
    }
  }

  
  return (
    <>
      <div className='container-fluid my-5'>
        <div className='row'>
          <div className="col-md-1"></div>
          <div className="col-md-10 p-3">
            <Link to={'/'} className='fs-5' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft} /> Back to home</Link>
            <div className='shadow bg-success p-md-3'>
              <div className="row my-md-5">
                <div className="col-md-6 d-flex justify-content-center align-items-center my-5"><img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" className='w-50' alt="" /></div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-light">
                  <h2>Project fair</h2>
                  {!register?
                    <h4>Sign in to Your Account</h4>:
                    <h4>Sign up to Your Account</h4>
                    }
                  <div className='mt-5 w-75 px-md-4 '>
                    {register && <input type="text" value={userdetails.username} className='form-control rounded-0 mb-2' onChange={(e)=>setuserdetails({...userdetails ,username:e.target.value})} placeholder='Username' name="" id=""  />}
                    <input type="email" value={userdetails.email} className='form-control rounded-0' onChange={(e)=>setuserdetails({...userdetails ,email:e.target.value})} placeholder='Email' name="" id=""  />
                    <input type="password" value={userdetails.password} className='form-control rounded-0 mt-2' onChange={(e)=>setuserdetails({...userdetails ,password:e.target.value})} placeholder='Password' name="" id=""  />
                    {!register ?
                      <div>
                      <button onClick={handlelogin} className='btn btn-warning w-100 mt-2 rounded-1'>login</button>
                      <p className='mt-3'>New User? Click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                    </div>
                    :
                    <div>
                      <button onClick={handleregister} className='btn btn-warning w-100 mt-2 rounded-1'>Register</button>
                      <p className='mt-3'>Already a User? Click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth
