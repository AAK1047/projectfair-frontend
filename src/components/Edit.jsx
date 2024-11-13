import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateuserprojectapi } from '../services/allapi';
import { editresponsecontext } from '../context/Contextshare';

function Edit({projects}) {
  const [show, setShow] = useState(false);
  const[preview , setpreview]=useState("")
  const {seteditresponse}=useContext(editresponsecontext)

  const handleClose = () =>{
     setShow(false)
     handlecancel()
    } ;

  const handleShow = () => setShow(true);
  const[key ,setkey]=useState(0)
  const[projectdetails,setprojectdetails]=useState({
    language:projects.language,
    title:projects.title,
    github:projects.github,
    overview:projects.overview,
    website:projects.website,
    projectimage:"",
  })
  console.log(projectdetails);
  const handlefile=(e)=>{
    
      setprojectdetails({...projectdetails,projectimage:e.target.files[0]})
      
    
  }
  const handlecancel=()=>{
    setprojectdetails({ 
      language:projects.language,
      title:projects.title,
      github:projects.github,
      overview:projects.overview,
      website:projects.website,
      projectimage:"",})
      setpreview("")
      if(key==0){
        setkey(1)
      }
      else(
        setkey(0)
      )
  }
  const handlesave=async()=>{
          
    const {title , language , github , website , overview}=projectdetails
    if(!title || !language  || !github || !website || !overview){
      toast.info("please fill out the form")
        
    }
    else{
      const reqbody = new FormData()
      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("website",website)
      reqbody.append("github",github)
      reqbody.append("overview",overview)
     preview? reqbody.append("projectimage",projectdetails.projectimage):reqbody.append("projectimage",projects.projectimage)

     const token = sessionStorage.getItem("token")
    if(preview){
      const reqheader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
    }
    const result = await updateuserprojectapi(projects._id,reqbody,reqheader)
    console.log(result);
    if(result.status==200){
      toast.success("project updated successfully")
      seteditresponse(result)
      setTimeout(() => {
        handleClose()
      }, 2000);
     
    }
    else{
      toast.error("something went wrong")
      handlecancel()
    }
    
   }
    else{
      
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateuserprojectapi(projects._id,reqbody,reqheader)
        console.log(result);
        if(result.status==200){
          toast.success("project updated successfully")
          seteditresponse(result)
          setTimeout(() => {
            handleClose()
          }, 2000);
        }
        else{
          toast.error("something went wrong")
          handlecancel()
        }
        

      }
    }
    
    
    }
  

  useEffect(()=>{
    if(projectdetails.projectimage){
      setpreview(URL.createObjectURL(projectdetails.projectimage))
    }
  },[projectdetails.projectimage])

  
  return (
    <>
    <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='mx-3' style={{color:'rgb(160,98,192)'}} />
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <label htmlFor="projectImage">
                  <input id='projectImage'className='d-none' type="file" key={key} onChange={(e)=>handlefile(e)} />
                  <img  src={preview?preview:  `${serverUrl}/upload/${projects.projectimage}`} className='w-100' alt="" />
                </label>
              </Col>
              <Col sm={12} md={6}>
              <input type="text" value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})} className="form-control mb-3" placeholder='Title' />
              <input type="text" value={projectdetails.language} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} className="form-control mb-3" placeholder='Language' />
              <input type="text" value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})} className="form-control mb-3" placeholder='Github' />
              <input type="text" value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})} className="form-control mb-3" placeholder='Website' />
              <textarea rows={5} value={projectdetails.overview} onChange={(e)=>setprojectdetails({...projectdetails,overview:e.target.value})} name="" className='form-control' placeholder='Overview'></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handlecancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlesave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>

    </>
  )
}

export default Edit