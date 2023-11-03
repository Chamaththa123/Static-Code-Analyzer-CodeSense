import React from 'react'
import './Sidebar.css'
import logo from '../../images/StaticAnalysis.png'

function Sidebar() {
  return (
    <div>
      <div class="sidenav">
        
       <center> <img src={logo} alt='logo' style={{width:'70%'}}/></center>
        <pre className='CodeSense'><i>CodeSense</i></pre>
  <a href="#about">Analyse Code</a>
  <a href="#services">WCC Metrice</a>
</div>
    </div>
  )
}

export default Sidebar
