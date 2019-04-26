import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getTweets } from './actions/tweet';
import { getUser } from './actions/auth';
import store from './store/configureStore';
import Header from './components/Header';
import TweetTimeline from './components/TweetTimeline';
import ProfileWidget from './components/ProfileWidget';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    // if token exists, get user info
    if (token) {
      store.dispatch(getUser(token));
    }
    store.dispatch(getTweets());
  }

  render() {
    return (
      <Provider store={store}>
        <Header addTweet={this.addTweet} />
        <Container className="mt-4">
          <Row>
            <Col sm="4">
              <ProfileWidget />
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
