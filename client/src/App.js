import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import history from './history';
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
      store.dispatch(getUser(token));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header addTweet={this.addTweet} />
          <Container className="mt-4">
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
