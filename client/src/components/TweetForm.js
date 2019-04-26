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
import { addTweet, editTweet } from '../actions/tweet';

export class TweetForm extends Component {
  state = {
    modalOpen: false,
    tweet: {
      text: this.props.formType === 'edit' ? this.props.tweet.text : '',
    },
    errorMessage: null,
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
    // show error message if empty tweet
    if (!this.state.tweet.text) {
      return this.setState({ errorMessage: 'Please enter a tweet' });
    }

    if (this.props.formType === 'edit') {
      // clear fields
      this.setState({
        tweet: {
          text: '',
        },
      });
      this.props.editTweet({
        text: this.state.tweet.text,
        _id: this.props.tweet._id,
      });
      this.toggle();
    } else {
      // clear fields
      this.setState({
        tweet: {
          text: '',
        },
      });
      this.props.addTweet({
        text: this.state.tweet.text,
        user: this.props.user.name,
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
            {this.state.errorMessage && (
              <Alert color="danger">{this.state.errorMessage}</Alert>
            )}
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Input
                  onChange={this.handleInputChange}
                  type="textarea"
                  name="text"
                  value={this.state.tweet.text}
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  addTweet: (tweet) => dispatch(addTweet(tweet)),
  editTweet: (editedTweet) => dispatch(editTweet(editedTweet)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetForm);
