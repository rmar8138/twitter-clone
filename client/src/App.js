import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import jwt from 'jsonwebtoken';
import history from './history';
import { getUsers } from './actions/user';
import { getUser } from './actions/auth';
import store from './store/configureStore';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    // if token exists, get user info
    if (token) {
      // if token is not expired get user, otherwise clear token
      const now = new Date().getTime();
      const expiry = jwt.decode(token).exp * 1000;

      if (now < expiry) {
        store.dispatch(getUser(token));
      } else {
        localStorage.removeItem('token');
      }
    }

    // get all users
    store.dispatch(getUsers());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header addTweet={this.addTweet} />
          <Container className="mt-4">
            <Route exact path="/" component={HomePage} />
            <Route path="/:username" component={ProfilePage} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
