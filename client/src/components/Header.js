import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import AccountDropdown from './AccountDropdown';
import TweetForm from './TweetForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export class Header extends Component {
  render() {
    return (
      <Navbar color="light">
        <Container>
          <NavbarBrand>
            <Link to="/">Twitter-Clone</Link>
          </NavbarBrand>
          <Nav className="ml-auto">
            {this.props.isAuthenticated ? (
              <Fragment>
                <NavItem>
                  <AccountDropdown user={this.props.user} />
                </NavItem>
                <NavItem className="ml-2">
                  <TweetForm>Tweet</TweetForm>
                </NavItem>
              </Fragment>
            ) : (
              <Fragment>
                <NavItem className="ml-2">
                  <LoginForm />
                </NavItem>
                <NavItem className="ml-2">
                  <RegisterForm />
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
