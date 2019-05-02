import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UsersWidget from '../components/UsersWidget';
import ProfileWidget from '../components/ProfileWidget';
import TweetTimeline from '../components/TweetTimeline';

export class HomePage extends Component {
  render() {
    return (
      <Row>
        <Col sm="4">
          <UsersWidget />
        </Col>
      </Row>
    );
  }
}

export default HomePage;
