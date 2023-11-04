import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import start from '../../images/start.jpg'
import logo from '../../images/StaticAnalysis.png'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,answer
      });
      if (res && res.data.success) {
        window.alert(res.data && res.data.message)
        navigate("/");
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

        <pre><i>CodeSense</i></pre>
      </div>

      <div className="button-container111">

        <Form onSubmit={handleSubmit}>
          <center><pre><h3>Register</h3></pre></center>
          <Row>
        <Col>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        </Col>
      </Row>
      <br/>
          <pre><Button variant="primary" type="submit" style={{ width: '100%', backgroundColor: '#181833' }}>
            LogIn
          </Button></pre>
          
        </Form>
      </div>
    </div>
  )
}

export default Register
