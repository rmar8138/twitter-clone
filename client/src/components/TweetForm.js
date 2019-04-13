import React, { Component, Fragment } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export class TweetForm extends Component {
  state = {
    modalOpen: false,
    tweet: '',
  };

  toggle = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.addTweet(this.state.tweet);
    this.toggle();
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.toggle}>Tweet</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Compose new Tweet</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Input
                  onChange={this.handleInputChange}
                  type="textarea"
                  name="tweet"
                  placeholder="What's happening?"
                />
              </FormGroup>
              <Button>Tweet</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default TweetForm;
