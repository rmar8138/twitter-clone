import React, { Component } from 'react';
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

export class Header extends Component {
  render() {
    return (
      <Navbar color="light">
        <Container>
          <NavbarBrand>Twitter-Clone</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <AccountDropdown />
            </NavItem>
            <NavItem className="ml-2">
              <TweetForm addTweet={this.props.addTweet}>Tweet</TweetForm>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
