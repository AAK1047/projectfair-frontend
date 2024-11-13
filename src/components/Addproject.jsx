import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectapi } from '../services/allapi';
import { addresponsecontext } from '../context/Contextshare';


function Addproject() {
  const [show, setShow] = useState(false);
  const [preview , setpreview]=useState("")
  console.log(preview);
  const [token , settoken]=useState("")
  const [key , setkey]=useState(1)
  const {setaddresponse}=useContext(addresponsecontext)

  const[projectdetails ,setprojectdetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectimage:""
  })

  useEffect(()=>{
    if(projectdetails.projectimage){
    setpreview(URL.createObjectURL(projectdetails.projectimage))
          
    }
    else{
      setpreview("")
    }

  },[projectdetails.projectimage])
  console.log(projectdetails);

  useEffect(()=>{
      if(sessionStorage.getItem("token")){
        settoken(sessionStorage.getItem("token"))
      }
  },[])
  console.log(token);
  
  

  const handleClose = () =>{
     setShow(false);
    handleCancel()
    }
  const handleShow = () => setShow(true);
  const handleCancel = ()=>{
    setprojectdetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })
    if(key==1){
      setkey(0)
    }
    else{
      setkey(1)
    }
  }
  const handleadd=async ()=>{
    const {title,language,github,website,overview,projectimage}=projectdetails

    if(!title||!language|!github|!website|!overview|!projectimage){
         toast.info("please fill out the form completely")
    }
    else{
      const reqbody = new FormData()
      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("github",github)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      reqbody.append("projectimage",projectimage)

         if(token){
            
          const header = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }

           const result = await addprojectapi(reqbody,header)
           console.log(result);
           if(result.status==200){
            toast.success('Project added successfully ')
            setTimeout(()=>{
              handleClose()
            },2000)
            setaddresponse(result)
           }
           else if(result.status==406){
              toast.warning(result.response.data)
              handleCancel()
           }
           else{
            toast.error("somethung went wrong")
            handleCancel()
           }
         }
         else{
          toast.warning("please login")
         }
    }
  }
  return (
    <>
    <button onClick={handleShow} className='btn rounded-0 text-light' style={{backgroundColor:'rgb(62,179,24)'}}>Add Project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <label htmlFor="projectImage">
                  <input id='projectImage' onChange={(e)=>setprojectdetails({...projectdetails , projectimage:e.target.files[0]})} key={key}   className='d-none' type="file" />
                  <img src={preview? preview:"https://www.svgrepo.com/show/309379/camera-add.svg"} className='w-100' alt="" />
                </label>
              </Col>
              <Col sm={12} md={6}>
              <input type="text" value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails , title:e.target.value})} className="form-control mb-3" placeholder='Title' />
              <input type="text" value={projectdetails.language} onChange={(e)=>setprojectdetails({...projectdetails , language:e.target.value})} className="form-control mb-3" placeholder='Language' />
              <input type="text" value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails , github:e.target.value})} className="form-control mb-3" placeholder='Github' />
              <input type="text" value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails , website:e.target.value})} className="form-control mb-3" placeholder='Website' />
              <textarea rows={5} value={projectdetails.overview} onChange={(e)=>setprojectdetails({...projectdetails , overview:e.target.value})} name="" className='form-control' placeholder='Overview'></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleadd}>
            Add
          </Button>
        </Modal.Footer>
      <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>

      </Modal>

    </>
  )
}

export default Addproject