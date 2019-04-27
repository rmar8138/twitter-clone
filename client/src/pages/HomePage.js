import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ProfileWidget from '../components/ProfileWidget';
import TweetTimeline from '../components/TweetTimeline';

export class HomePage extends Component {
  render() {
    return (
      <Row>
        <h1>This is the home page bruh</h1>
      </Row>
    );
  }
}

export default HomePage;
