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
import { register } from '../actions/auth';
import { clearErrors } from '../actions/error';

export class RegisterForm extends Component {
  state = {
    modalOpen: false,
    name: '',
    username: '',
    email: '',
    password: '',
    errorMessage: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // If login fail, set error message
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
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
    const { name, username, email, password } = this.state;
    e.preventDefault();
    this.props.register({
      name,
      username,
      email,
      password,
    });
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.toggle}>Register</Button>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.errorMessage && (
              <Alert color="danger">{this.state.errorMessage}</Alert>
            )}
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  onChange={this.handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Username</Label>
                <Input
                  onChange={this.handleInputChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </FormGroup>
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
              <Button>Register</Button>
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
  register: (credentials) => dispatch(register(credentials)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);
