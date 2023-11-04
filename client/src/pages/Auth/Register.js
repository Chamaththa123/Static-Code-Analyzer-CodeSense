import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import start from '../../images/start.jpg'
import logo from '../../images/StaticAnalysis.png'
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  // Function to toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/register`, {
        name,
        email,
        password,
        answer
      });
      if (res && res.data.success) {
        window.alert(res.data && res.data.message);
        navigate("/Login");
      } else {
        window.alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      window.alert("Something Wrong!!");
    }
  };

  return (
    <div style={{ margin: '0', overflow: 'hidden' }}>
      <img src={start} className='start' />
      <img src={logo} className='start2' />

      <div className="button-container111">
        <Form onSubmit={handleSubmit}>
          <center><pre><h3>Create Account</h3></pre></center>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <pre><Form.Label>User Name :</Form.Label>
            <Form.Control
              placeholder="Enter User Name"
              style={{ fontSize: '13px', padding: '10px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </pre>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridEmail">
            <pre><Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              style={{ fontSize: '13px', padding: '10px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </pre>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <pre><Form.Label>What is your favorite coding language ?</Form.Label>
            <Form.Control
              placeholder="Enter Favorite Coding Language"
              style={{ fontSize: '13px', padding: '10px' }}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Form.Text style={{ color: '#cacaca', marginTop: '-20%' }}>
              <pre>** This answer is used to reset the password.</pre>
            </Form.Text>
            </pre>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridPassword">
            <pre> <Form.Label>Password :</Form.Label>
            <div className="password-input">
              <Form.Control
                type={showPassword ? "text" : "password"} // Show/hide password
                placeholder="Enter Password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
                style={{ fontSize: '13px', padding: '10px' }}
              />
              <span className="password-toggle" onClick={togglePasswordVisibility} style={{float:'right',marginTop:'-8%',color:'gray',marginRight:'3%'}}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            </pre>
          </Form.Group>
          <pre><Button variant="primary" type="submit" style={{ width: '100%', backgroundColor: '#181833' }}>
            Create Account
          </Button></pre>
          <center><pre>Already a Member? <a onClick={() => navigate("/Login")} href="" style={{ textDecoration: 'none' }}>Login</a></pre></center>
        </Form>
      </div>
    </div>
  );
}

export default Register;
