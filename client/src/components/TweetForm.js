import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addTweet, editTweet } from '../actions/tweet';

export class TweetForm extends Component {
  state = {
    modalOpen: false,
    tweet: {
      tweet: this.props.formType === 'edit' ? this.props.tweet.tweet : '',
    },
  };

  toggle = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      tweet: {
        [e.target.name]: e.target.value,
      },
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.props.formType === 'edit') {
      this.props.editTweet({
        ...this.state.tweet,
        id: this.props.tweet.id,
      });
      this.toggle();
    } else {
      this.props.addTweet({
        ...this.state.tweet,
        id: uuid(),
      });
      this.toggle();
    }
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.toggle}>{this.props.children}</Button>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.props.formType === 'edit'
              ? 'Edit Tweet'
              : 'Compose new Tweet'}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Input
                  onChange={this.handleInputChange}
                  type="textarea"
                  name="tweet"
                  value={this.state.tweet.tweet}
                  placeholder="What's happening?"
                />
              </FormGroup>
              <Button>
                {this.props.formType === 'edit' ? 'Save changes' : 'Tweet'}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTweet: (tweet) => dispatch(addTweet(tweet)),
  editTweet: (editedTweet) => dispatch(editTweet(editedTweet)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TweetForm);
