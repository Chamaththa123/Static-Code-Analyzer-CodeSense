import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../../components/Layout/Sidebar'
import Header from '../../components/Layout/Header'
import logo from '../../images/StaticAnalysis.png'
import user from '../../images/user.png'
import './Review.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { FaStar } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import { useAuth } from "../../context/auth";

const colors = {
    orange: "#FEB902",
    grey: "#D4D1D0",
};

function Review() {

    const stars = Array(5).fill(0);

    const [inputs, setInput] = useState({});
    const [auth, setAuth] = useAuth();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1
        }/${current.getFullYear()}`;
    const name = auth?.user?.name;

    const [inpval, setINP] = useState({
        rating: "",
        comment: ""
    });
    console.log(inpval);

    const setdata = (e) => {
        setINP((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        await axios
            .post(`http://localhost:8000/review/add`, {
                name: String(name),
                rating: Number(inpval.rating),
                comment: String(inpval.comment),
                date: String(date),

            })
            .then((res) => res.data);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inpval);
        sendRequest();

    };

    const [review, setreview] = useState([]);
    console.log(review);

    useEffect(() => {
        getReviews();
    });

    const getReviews = () => {
        axios
            .get(`http://localhost:8000/AllReview`)
            .then((res) => {
                setreview(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    return (
        <div>
            <Sidebar />
            <div className='main'>
                <Header />
                <div className='content'>
                    <div>
                        <img src={logo} alt='logo' style={{ width: '15%' }} />
                        <div className='head'>
                            <h2><span className='name'><><i>CodeSense</i></></span></h2><br /><br />
                            <p style={{ fontSize: '12px' }}>Check Java Code 100% Free!</p>
                        </div>
                        <div className='review1'>
                            <Card style={{ borderColor: 'white' }}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <span style={{ fontSize: '16px' }}>What do you think about <i>CodeSense</i> ?</span><br />
                                            <span style={{ fontSize: '13px' }}>Leave a rating or review for the community.</span>
                                        </Col>
                                        <Col>
                                            <Form onSubmit={handleSubmit}>
                                                <Rating name="half-rating" defaultValue={0} precision={1}
                                                    name="rating"
                                                    value={inpval.rating}
                                                    onChange={setdata} />
                                                <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here" style={{ color: 'black', fontSize: '14px' }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        style={{ height: '70px' }}
                                                        name="comment"
                                                        value={inpval.comment}
                                                        onChange={setdata}
                                                    />
                                                </FloatingLabel>
                                                <br />
                                                <Button variant="primary" type="submit">
                                                    write Review
                                                </Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <h4>What do people think of <i>CodeSense</i> ?</h4>
                            <span>The community submitted <span style={{ color: '#FFC300' }}>541 reviews</span> to tell us what they like about <i>CodeSense</i>, what <i>CodeSense</i> can do better, and more.</span>

                            <div className='review2'>
                                <Card style={{ borderColor: 'white' }}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <span style={{ fontSize: '16px' }}>What do you think about <i>CodeSense</i> ?</span><br />
                                                <span style={{ fontSize: '13px' }}>Leave a rating or review for the community.</span>
                                            </Col>
                                            <Col>
                                                <div style={styles.stars}>
                                                    <Row>
                                                        <Col>
                                                            {stars.map((_, index) => {
                                                                return (
                                                                    <FaStar
                                                                        size={15}
                                                                        color={
                                                                            5 > index
                                                                                ? colors.orange
                                                                                : colors.grey
                                                                        }
                                                                    />
                                                                );
                                                            })}<br />
                                                            {stars.map((_, index) => {
                                                                return (
                                                                    <FaStar
                                                                        size={15}
                                                                        color={
                                                                            4 > index
                                                                                ? colors.orange
                                                                                : colors.grey
                                                                        }
                                                                    />
                                                                );
                                                            })}<br />
                                                            {stars.map((_, index) => {
                                                                return (
                                                                    <FaStar
                                                                        size={15}
                                                                        color={
                                                                            3 > index
                                                                                ? colors.orange
                                                                                : colors.grey
                                                                        }
                                                                    />
                                                                );
                                                            })}<br />
                                                            {stars.map((_, index) => {
                                                                return (
                                                                    <FaStar
                                                                        size={15}
                                                                        color={
                                                                            2 > index
                                                                                ? colors.orange
                                                                                : colors.grey
                                                                        }
                                                                    />
                                                                );
                                                            })}<br />
                                                            {stars.map((_, index) => {
                                                                return (
                                                                    <FaStar
                                                                        size={15}
                                                                        color={
                                                                            1 > index
                                                                                ? colors.orange
                                                                                : colors.grey
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                        </Col>
                                                        <Col>
                                                            <ProgressBar now={60} style={{ width: '200px', height: '10px', marginTop: '9px' }} variant="warning" />
                                                            <ProgressBar now={60} style={{ width: '200px', height: '10px', marginTop: '12px' }} variant="warning" />
                                                            <ProgressBar now={60} style={{ width: '200px', height: '10px', marginTop: '12px' }} variant="warning" />
                                                            <ProgressBar now={60} style={{ width: '200px', height: '10px', marginTop: '12px' }} variant="warning" />
                                                            <ProgressBar now={60} style={{ width: '200px', height: '10px', marginTop: '12px' }} variant="warning" />
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="review1">
                                {review.map((review, id) => {
                                    return (
                                        <div>
                                            <Card style={{ borderRadius: '10px', borderColor: 'white' }}>
                                                <img src={user} alt='logo' style={{ width: '8%' }} />
                                                <div className='head2'>
                                                    <h5><span className='name2'><><i>{review.name}</i></></span></h5><br /><br />
                                                    <p style={{ fontSize: '12px', marginTop: '-15px' }}><Rating
                                                        style={{ fontSize: "17px" }}
                                                        name="half-rating-read"
                                                        defaultValue={review.rating}
                                                        precision={0.5}
                                                        readOnly
                                                    /></p>
                                                </div>
                                                <span><i>{review.comment}</i></span><br/>
                                                <span style={{fontSize:'12px'}}><i>{review.date}</i></span>
                                            </Card>
                                            <br />
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Review
const styles = {
    stars: {
        display: "flex",
        flexDirection: "row",
        Animationdelay: "4s",
    },
};
