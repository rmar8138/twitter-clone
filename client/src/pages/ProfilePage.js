import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ProfileWidget from '../components/ProfileWidget';
import TweetTimeline from '../components/TweetTimeline';

// first, check if authenticated
// if authenticated, check if decrypted token matches user id
// if match, display user functionality (edit etc)
// if no match, dont display user functionality

export class ProfilePage extends Component {
  // componentDidMount() {
  //   console.log(this.props);
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.username !== prevProps.username) {
  //     console.log(this.props);
  //     const { username, userLoading, isAuthenticated } = this.props;
  //     const { username: visitedUser } = this.props.match.params;
  //     if (isAuthenticated) {
  //       if (username === visitedUser) {
  //         console.log('This is my swamp!');
  //       } else {
  //         console.log('This is not my swamp');
  //       }
  //     }
  //   }
  // }

  render() {
    const { username } = this.props.match.params;
    return (
      !this.props.userLoading && (
        <Row>
          <Col sm="4">
            <ProfileWidget username={username} />
          </Col>
          <Col sm="8">
            <TweetTimeline username={username} />
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
