import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { login } from '../actions/auth';
import { clearErrors } from '../actions/error';

export class LoginForm extends Component {
  state = {
    modalOpen: false,
    email: '',
    password: '',
    errorMessage: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // If login fail, set error message
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ errorMessage: error.msg.msg });
      } else {
        this.setState({ errorMessage: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modalOpen) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
      errorMessage: null,
    }));
    this.props.clearErrors();
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    return (
      <Fragment>
        {!this.props.isAuthenticated && (
          <Button onClick={this.toggle}>Login</Button>
        )}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.errorMessage && (
              <Alert color="danger">{this.state.errorMessage}</Alert>
            )}
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={this.handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button>Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
