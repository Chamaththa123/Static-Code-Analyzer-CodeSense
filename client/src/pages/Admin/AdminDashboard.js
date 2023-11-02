import React from "react";
import Layout from "./../../components/Layout/Layout";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import timetable from '../../images/timetable.png'
import pickup from '../../images/pickup.png'
import conductor from '../../images/conductor.png'
import traffic from '../../images/traffic.png'

const AdminDashboard = () => {
  return (
    <Layout>
      <Row className="g-2" style={{ padding: '100px' ,marginTop:'-17px'}}>
        <Col md>
          <Card style={{ width: '20rem', height: '10rem', padding: '30px' }}>
            <Row className="g-2">
              <Col md>
                <img src={timetable} style={{ width: '100px', height: '100px' }} />
              </Col>
              <Col md>
                <h3>Bus Timetables</h3>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md>
          <Card style={{ width: '20rem', height: '10rem', padding: '30px' }}>
            <Row className="g-2">
              <Col md>
                <img src={pickup} style={{ width: '100px', height: '100px' }} />
              </Col>
              <Col md>
                <h3>Passengers</h3>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md>
          <Card style={{ width: '20rem', height: '10rem', padding: '30px' }}>
            <Row className="g-2">
              <Col md>
                <img src={traffic} style={{ width: '100px', height: '100px' }} />
              </Col>
              <Col md>
                <h3><a href="/dashboard/AllTraffic" className="header-link">Traffic Conditions</a></h3>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="g-2" style={{ paddingLeft: '50px' ,marginTop:'-60px'}}>
        <Col md>
        </Col>
        <Col md>
          <Card style={{ width: '20rem', height: '10rem', padding: '30px' }}>
            <Row className="g-2">
              <Col md>
                <img src={conductor} style={{ width: '100px', height: '100px' }} />
              </Col>
              <Col md>
                <h3>Bus Inspectores</h3>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md>
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminDashboard;
