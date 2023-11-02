import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Layout from '../../components/Layout/Layout';
import Card from 'react-bootstrap/Card';

function UpdateTraffic() {
    const id = useParams().id;
    console.log(id);
    const history = useNavigate();
    const [inputs, setInput] = useState({});

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:8000/traffic/${id}`)
                .then((res) => res.data)
                .then((data) => setInput(data.traffic));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:8000/traffic/update/${id}`, {
                status: String(inputs.status),
            })
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => {
            history("/dashboard/AllTraffic");
            window.alert("Set Status Successfully!!!");
        });
    };    

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const deleteHandler = () => {
        axios
          .delete(`http://localhost:8000/traffic/delete/${id}`)
          .then((res) => res.data)
          .then(() => history("/dashboard/AllTraffic"), alert("Item Deleted!!!"));
      };
    return (
        <Layout>
            <center><h2 style={{margin:'50px'}}>Traffic Condition in {inputs.route} Route</h2></center>

            <Card style={{ width: '58rem', margin: '0 auto',paddingTop:'30px',height:'auto' }} className="my-5">
            <Row className="g-2 justify-content-center mb-4">
                <Col md={5}>
                    <b>Bus No :</b> {inputs.bus}
                </Col>
                <Col md={5}>
                    <b>Bus Route :</b> {inputs.route}
                </Col>
            </Row>

            <Row className="g-2 justify-content-center mb-4">
                <Col md={5}>
                    <b>Bus Route Segment :</b> {inputs.segment}
                </Col>
                <Col md={5}>
                    <b>Time of Day :</b> {inputs.time}
                </Col>
            </Row>

            <Row className="g-2 justify-content-center mb-4">
                <Col md={5}>
                    <b>Traffic Type :</b> {inputs.type}
                </Col>
                <Col md={5}>
                    <b>Description  :</b> {inputs.description}
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="g-2 justify-content-center mb-4">
                    <Col md={5}>
                        <b>Status  :</b>
                        <Form.Select
                            aria-label="Default select example"
                            name="status"
                            value={inputs.status}
                            onChange={handleChange}
                            style={{width:'50%'}}
                        >
                            <option>Select</option>
                            <option value="Recorded">Recorded</option>
                            <option value="Pending">Pending</option>
                        </Form.Select>
<br/>
                        <Button variant="primary" type="submit" className="traffic-submit-btn">
                            Submit
                        </Button>
                    </Col>
                    <Col md={5}>
                    <b>Delete Recodes  :</b>
                    <button
                  onClick={deleteHandler}
                  style={{
                    marginLeft: "50px",
                    borderRadius: "5px",
                    height: "40px",
                    color: "white",
                    backgroundColor: "#FF3737 ",
                    border: "none",
                  }}
                >
                  &nbsp;&nbsp;<i class="fas fa-trash-alt"></i> &nbsp;Delete
                  Item&nbsp;&nbsp;
                </button>
                    </Col>
                </Row>
            </Form>
    </Card>
            
        </Layout>

    )
}

export default UpdateTraffic
