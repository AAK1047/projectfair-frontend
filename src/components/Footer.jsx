import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'




function Footer() {
  return (
  <>  
  <div className='p-5 bg-success'>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4">
                <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3'/>Project Fair</h3>
                <p className='mt-3 ' style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt placeat beatae quibusdam error assumenda! Eum totam quibusdam aut eveniet perferendis, quam, provident accusantium, recusandae explicabo dolorem quidem veritatis corporis blanditiis.  </p>
            </div>
            <div className="col-md-2 d-md-flex  justify-content-center">
                <div className=''>
                    <h3 className='text-light'>Guides</h3>
                    <p className='mt-3'>Home</p>
                    <p>Project</p>
                    <p>Dashboard</p>
                </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-2 d-md-flex  justify-content-center ">
            <div className=' '>
                    <h3 className='text-light'>Links</h3>
                    <p className='mt-3'>React</p>
                    <p>Reactbootstrap</p>
                    <p>Bootswatch</p>
                </div>
            </div>
            <div className="col-md-3">
                <h3 className='text-light'>Contact Us</h3>
                <div className="d-md-flex mt-3">
                    <input type="text" placeholder='Email Id' className='form-control ' />
                    <button className='btn btn-warning ms-2 '>Subscribe</button>
                </div>
                <div className="d-flex mt-4 justify-content-between">
                <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-light'/>
              <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light'/>
              <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light'/>
              <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>


                </div>
            </div>
        </div>
    </div>

  </div>
  </>
  )
}

export default Footer