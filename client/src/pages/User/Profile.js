import React from 'react'
import { useAuth } from '../../context/auth'
import UserUploadedFiles from './AllCode';
import Sidebar from '../../components/Layout/Sidebar';
import './Profile.css'
import Header from '../../components/Layout/Header';

function Profile() {
        const [auth, setAuth] = useAuth();
        return (
                <div style={{ color: 'white' }}>
                        <Sidebar />
                        <div className='main'>
                                <Header />
                                <div className='content'>
                                        <center><span className='profile'>My Profile</span></center>
                                        <center><h4><i>{auth?.user?.name}</i></h4></center>
                                        <UserUploadedFiles />
                                </div>
                        </div>
                </div>
        )
}

export default Profile
