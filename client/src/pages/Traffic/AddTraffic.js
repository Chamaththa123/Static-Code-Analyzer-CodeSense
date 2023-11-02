import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "../../App.css";

function AddTraffic() {

  const [bus, setbus] = useState("");
  const [route, setroute] = useState("");
  const [segment, setsegment] = useState("");
  const [time, settime] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/traffic/add`,
        {
          bus,
          route,
          segment,
          time,
          type,
          description
        }
      );
      if (res && res.data.success) {
        window.alert("Submit Traffic Conditions successfully !!");
        // Clear the input fields after successful submission
        setbus("");
        setroute("");
        setsegment("");
        settime("");
        settype("");
        setdescription("");
        navigate("/AddTraffic");
      } else {
        window.alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      window.alert("Something Went Wrong!!");
    }
  };

  return (
    <Layout title={"Ticketing system"}>
      <Container>
        <center><h3 className="traffic-header">Report Traffic Conditions</h3></center>
        <Row className="justify-content-md-center">
          <Col xs={12} md={9}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bus No :</Form.Label>
                <Form.Control type="text" placeholder="Enter Bus No" value={bus}
                  onChange={(e) => setbus(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Route No :</Form.Label>
                <Form.Control type="text" placeholder="Enter Route No" value={route}
                  onChange={(e) => setroute(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Route Segment :</Form.Label>
                <Form.Control type="text" placeholder="Enter Route Segment" value={segment}
                  onChange={(e) => setsegment(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Time of Date :</Form.Label>
                <Form.Control type="text" placeholder="Enter Time of Date" value={time}
                  onChange={(e) => settime(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Type of Traffic :</Form.Label>
                <Form.Control type="text" placeholder="Enter Type of Traffic" value={type}
                  onChange={(e) => settype(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description :</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Description">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }} value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <Button variant="primary" type="submit" className="traffic-submit-btn">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default AddTraffic;