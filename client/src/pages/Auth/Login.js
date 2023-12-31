import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import start from '../../images/start.jpg'
import logo from '../../images/StaticAnalysis.png'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Function to toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        window.alert(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/Upload");
      } else {
        window.alert(res.data.message)
      }
    } catch (error) {
      console.log(error);
      window.alert("Something Wrong!!")
    }
  };

  return (
    <div style={{ margin: '0', overflow: 'hidden' }}>
      <img src={start} className='start' />
      <img src={logo} className='start2' />

      <div className="button-container21">
        <span style={{ fontWeight: 200 }}><><i>CodeSense</i></></span>
      </div>

      <div className="button-container1">
        <Form onSubmit={handleSubmit}>
          <center><pre><h3>LogIn</h3></pre></center>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <pre>Email Address</pre>
            <pre><Form.Control type="email" placeholder="Enter email" value={email}
              onChange={(e) => setEmail(e.target.value)} /></pre>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <pre>Password</pre>
            <pre>
              <div className="password-input">
                <Form.Control
                  type={showPassword ? "text" : "password"} // Show/hide password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility} style={{ float: 'right', marginTop: '-7.5%', color: 'gray', marginRight: '3%' }}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </pre>
          </Form.Group>
          <pre><a onClick={() => {
            navigate("/ForgotPassword");
          }} href="" style={{ textDecoration: 'none' }}>Forgot Password ?</a></pre>
          <pre><Button variant="primary" type="submit" style={{ width: '100%', backgroundColor: '#181833' }}>
            LogIn
          </Button></pre>
          <br />
          <br />
          <center><pre>Need an account? <a onClick={() => {
            navigate("/Register");
          }} href="" style={{ textDecoration: 'none' }}>Register</a></pre></center>
        </Form>
      </div>
    </div>
  )
}

export default Login