import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import history from '../history';
import { logout } from '../actions/auth';

export class AccountDropdown extends Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogout = () => {
    this.props.logout();
    history.push('/');
  };

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="info">
          Account
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => history.push(`/${this.props.user.username}`)}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps,
)(AccountDropdown);
