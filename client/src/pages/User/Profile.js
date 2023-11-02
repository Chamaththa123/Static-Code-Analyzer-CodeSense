import React from 'react'
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { useAuth } from '../../context/auth'
import user from '../../images/user.png'

function Profile() {
    const [auth, setAuth] = useAuth();
  return (
    <Layout title={"CakeFantasy - Profile"}>
        <Header/>
        <div>
        {/* <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
              <h3> Admin Contact : {auth?.user?.address}</h3> */}
              <hr style={{ marginTop: "-10px" }}></hr>
          
        <div className='user-column1'>
<img src={user} alt='user' style={{width:'250px'}}/>
        </div>
        <div className='user-column2'>
<h2><i class="fa fa-angle-double-down" style={{fontSize:'28px'}}></i>&nbsp;User Profile</h2>
<br></br>
<br></br>
<p><i class="fa fa-arrow-circle-right"></i> User Name : {auth?.user?.name}</p>
<br></br>

<p><i class="fa fa-arrow-circle-right"></i> User Email : {auth?.user?.email}</p>

        </div>
        <div className='user-column3'>
        <br></br>
<br></br>
<br></br>
<br></br>
<p style={{marginTop:'-5px'}}><i class="fa fa-arrow-circle-right"></i> User Phone : {auth?.user?.phone}</p>
<br></br>

<p><i class="fa fa-arrow-circle-right"></i> User Address : {auth?.user?.address}</p>
        </div>
    </div>
        <Footer/>
    </Layout>
  )
}

export default Profile
