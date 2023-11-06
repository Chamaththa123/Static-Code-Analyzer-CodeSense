import React from 'react'
import Sidebar from '../../components/Layout/Sidebar'
import Header from '../../components/Layout/Header'
import logo from '../../images/StaticAnalysis.png'
import './Review.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaStar } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

const colors = {
    orange: "#FEB902",
    grey: "#D4D1D0",
};

function Review() {

    const stars = Array(5).fill(0);
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
                                                            })}<br/>
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
                                                            })}<br/>
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
                                                            })}<br/>
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
                                                            })}<br/>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
