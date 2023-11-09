import React from 'react'
import './Sidebar.css'
import logo from '../../images/StaticAnalysis.png'

function Sidebar() {

  return (
    <div>
      <div class="sidenav">
        <center> <img src={logo} alt='logo' style={{ width: '70%' }} /></center>
        <center><span className='CodeSense'><i>CodeSense</i></span></center>
        <br />
        <a href="/Upload">Analyse Code</a>
        <a href="/Profile">Profile</a>
        <a href="/RateUs">Rate Us</a>
      </div>
    </div>
  )
}

export default Sidebar
