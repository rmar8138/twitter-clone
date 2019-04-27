import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ProfileWidget from '../components/ProfileWidget';
import TweetTimeline from '../components/TweetTimeline';

export class ProfilePage extends Component {
  render() {
    return (
      !this.props.userLoading && (
        <Row>
          <Col sm="4">
            <ProfileWidget />
          </Col>
          <Col sm="8">
            <TweetTimeline />
          </Col>
        </Row>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  userLoading: state.auth.userLoading,
});

export default connect(mapStateToProps)(ProfilePage);
