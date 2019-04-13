import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';

export class AccountDropdown extends Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="info">
          Account
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default AccountDropdown;
