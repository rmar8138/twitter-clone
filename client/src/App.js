import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import TweetTimeline from './components/TweetTimeline';
import ProfileWidget from './components/ProfileWidget';

class App extends Component {
  state = {
    currentUser: {
      name: 'Ragan Martinez',
      username: 'rmar8138',
      tweets: 91,
      following: 205,
      followers: 22,
    },
    tweets: ['Test Tweet 1', 'Test Tweet 2', 'Test Tweet 3'],
  };

  addTweet = (tweet) => {
    this.setState({ tweets: [...this.state.tweets, tweet] });
  };

  render() {
    return (
      <Fragment>
        <Header addTweet={this.addTweet} />
        <Container className="mt-4">
          <Row>
            <Col sm="4">
              <ProfileWidget currentUser={this.state.currentUser} />
            </Col>
            <Col sm="8">
              <TweetTimeline tweets={this.state.tweets} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
