import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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

export class Header extends Component {
  render() {
    return (
      <Navbar color="light">
        <Container>
          <NavbarBrand>Twitter-Clone</NavbarBrand>
          <Nav className="ml-auto">
            {this.props.isAuthenticated && (
              <Fragment>
                <NavItem>
                  <AccountDropdown />
                </NavItem>
                <NavItem className="ml-2">
                  <TweetForm>Tweet</TweetForm>
                </NavItem>
              </Fragment>
            )}

            <NavItem className="ml-2">
              <LoginForm />
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
