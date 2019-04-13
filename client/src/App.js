import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import store from './store/configureStore';
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
  };

  addTweet = (tweet) => {
    this.setState({ tweets: [...this.state.tweets, tweet] });
  };

  render() {
    return (
      <Provider store={store}>
        <Header addTweet={this.addTweet} />
        <Container className="mt-4">
          <Row>
            <Col sm="4">
              <ProfileWidget currentUser={this.state.currentUser} />
            </Col>
            <Col sm="8">
              <TweetTimeline />
            </Col>
          </Row>
        </Container>
      </Provider>
    );
  }
}

export default App;
