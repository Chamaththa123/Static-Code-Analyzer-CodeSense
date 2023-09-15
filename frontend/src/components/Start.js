import React from 'react'
import Button from 'react-bootstrap/Button';
import start from '../images/start.jpg'
import logo from '../images/StaticAnalysis.png'

function Start() {
  return (
    <div style={{margin:'0',overflow:'hidden'}}>

     
     <img src={start} className='start'/>
     <img src={logo} className='start2'/>

     <div className="button-container2">
    
     <pre> Static Code Analysis</pre>
        </div>

     <div className="button-container">
    
     <a variant="primary" href={'/UploadCode'} className='start-btn' style={{textDecoration:'none',color:'#9C9C9C '}}><h5>Scan Your Code ..</h5></a>
        </div>
    </div>
  )
}

export default Start
