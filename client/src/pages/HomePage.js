import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import bus from '../images/bus.png'
import traffic from '../images/traffic.png'

function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"CakeFantasy - HomePage"}>
      <Row className="g-2" style={{ padding: '160px', marginTop: '-17px' }}>
        <Col md>
        </Col>
        <Col md>
          <Card style={{ width: '20rem', height: '10rem', padding: '30px' }}>
            <Row className="g-2">
              <Col md>
                <img src={bus} style={{ width: '100px', height: '100px' }} />
              </Col>
              <Col md>
                <h3>Route Changes</h3>
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
                <h3><a href="/AddTraffic" className="header-link">Report Traffic Conditions</a></h3>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md>
        </Col>
      </Row>
    </Layout>
  );
}
Layout.defaultProps = {
  title: "Cake Fantasy Cake Shop",
  description: "Cake Fantasy Cake Shop",
  keywords: "cake",
  author: "Chamaththa Shamod",
};

export default HomePage;
