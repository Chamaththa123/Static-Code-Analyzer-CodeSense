import React, { useState } from "react";
import Modal from 'react-modal';
import { useAuth } from "../context/auth";
import start from '../images/start.jpg'
import logo from '../images/StaticAnalysis.png'
import './Start.css'
import Button from 'react-bootstrap/Button';

Modal.setAppElement('#root');
function Start() {
    const [auth, setAuth] = useAuth();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        content: {
            width: '80%',
            margin: 'auto',
            backgroundColor: '#181833',
            color: 'white'
        },
    };
    return (
        <div style={{ margin: '0', overflow: 'hidden' }}>
            <img src={start} className='start' />
            <img src={logo} className='start2' />
            <div className="button-container3">
                <a onClick={openModal}>? Help</a>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <button onClick={closeModal} style={{ borderRadius: '30px', height: '40px' }}>Close</button>
                    <center><h3><span ><><i style={{ fontWeight: 200 }}>CodeSense</i></> Help Center</span></h3></center>
                    <h5>Getting Started</h5>
                    <h6>Registering an Account</h6>
                    <p>To start using the Code Analyzer Web App, you'll need to create an account. Click on the "Register" button and fill in the required information. Once registered, you can log in with your credentials.</p>
                    <h6>Uploading Java Code</h6>
                    <ul>
                        <li>1. After logging in, navigate to the upload page.</li>
                        <li>2. Click on the "Upload" button and select your Java code file.</li>
                        <li>3. The app will display the original file content, calculate complexity, and identify syntax errors in the uploaded code.</li>
                    </ul>
                    <h6>Viewing Uploaded Codes</h6>
                    <p>Visit your profile to see a list of previously uploaded codes. Click on any code to view its details, including complexity metrics and any identified syntax errors.</p>
                    <h6>Code Analysis Features</h6>
                    <i> <h7>Complexity Calculation</h7></i>
                    <p>The app calculates the complexity of both the original code and the code without duplicated sections. This provides insights into the structural complexity of your code.</p>
                    <i><h7>Software Composition Analysis Metrics</h7></i>
                    <p>Row-based metrics are provided, giving you an overview of the composition of your software. This includes metrics like the number of lines of code, comments, and blank lines.</p>
                    <i><h7>Duplicated Code Detection</h7></i>
                    <p>Upon uploading, the app identifies duplicated code and displays them. You can view the duplicated sections, get suggestions for restructured code, and see the complexity without duplicates.</p>
                    <h6>Saving and Downloading</h6>
                    <i><h7>Saving Uploaded Code</h7></i>
                    <p>Save your uploaded code for future reference. Click the "Save" button after uploading to add the code to your profile.</p>
                    <i><h7>Downloading Previous Codes</h7></i>
                    <p>Visit your profile to see a list of previously uploaded codes. Click on the "Download" button to retrieve a copy of your code.</p>
                    <h6>Reviewing the Tool</h6>
                    <p>We value your feedback! Visit the review section to share your thoughts on the Code Analyzer Web App. Your insights help us improve.</p>
                </Modal>
            </div>
            <div className="button-container2">

                <span style={{ fontWeight: 200 }}><><i>CodeSense</i></></span>
            </div>
            <div>
                {!auth?.user ? (
                    <>
                        <div className="button-container">
                            <pre><i>Unleash the Power of Code Efficiency</i></pre> <br></br>
                            <pre>Start optimizing your Java code like never before. <br></br>
                                Identify,analyze, and perfect your software projects <br></br>effortlessly with our Java Code Analyzer.</pre>
                            <br></br> <br></br>
                            <pre>Don't have Account? &nbsp; &nbsp; &nbsp;<Button href='/Register' style={{ width: '50%', backgroundColor: '#181833' }}>
                                Register
                            </Button></pre>
                            <br />
                            <pre>Already a Member?  &nbsp; &nbsp; &nbsp; <Button href='/Login' style={{ width: '50%', backgroundColor: '#181833' }}>
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
                                <br />error detection, and complexity analysis. Your journey to cleaner,<br />more efficient code starts now!</pre>
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
