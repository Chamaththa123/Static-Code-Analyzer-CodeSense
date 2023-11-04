import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import start from '../images/start.jpg'
import logo from '../images/StaticAnalysis.png'
import './Start.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Start() {
    const [auth, setAuth] = useAuth();
    return (
        <div style={{ margin: '0', overflow: 'hidden' }}>


            <img src={start} className='start' />
            <img src={logo} className='start2' />

            <div className="button-container2">

                <pre><i>CodeSense</i></pre>
            </div>
            <div>
                {!auth?.user ? (
                    <>
                        <div className="button-container">
                        <pre><i>Unleash the Power of Code Efficiency</i></pre> <br></br>
                        <pre>Start optimizing your Java code like never before. <br></br>
                        Identify,analyze, and perfect your software projects <br></br>effortlessly with our Java Code Analyzer.</pre>
                        <br></br> <br></br>
                            <pre>Don't have Account? &nbsp; &nbsp; &nbsp;<Button href='/Register' style={{ width: '50%',backgroundColor:'#181833' }}>
                                Register
                            </Button></pre>
                            <br />
                            <pre>Already a Member?  &nbsp; &nbsp; &nbsp; <Button href='/Login' style={{ width: '50%',backgroundColor:'#181833' }}>
                                LogIn
                            </Button></pre>

                        </div>
                    </>
                ) : (
                    <>
                        <div className="button-container11">
                            <pre><h3>Hello, <i>{auth?.user?.name}</i></h3></pre>
                            <pre>Get ready to supercharge your coding experience.</pre>
                            <pre>Upload your Java files, and let's dive into the world of code optimization,
                            <br/>error detection, and complexity analysis. Your journey to cleaner,<br/>more efficient code starts now!</pre>
                        <pre><h3><i>Happy Coding!!!</i></h3></pre>
                        <pre><Button href='/Upload' style={{ width: '30%', backgroundColor: '#181833' }}>
                                Start Now
                            </Button></pre>
                        </div>
                    </>
                )}
            </div>


        </div>
    )
}

export default Start
