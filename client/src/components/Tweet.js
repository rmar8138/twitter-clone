import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from 'reactstrap';
import TweetForm from './TweetForm';
import { deleteTweet } from '../actions/tweet';

export class Tweet extends Component {
  handleDeleteTweet = (id, e) => {
    e.preventDefault();
    this.props.deleteTweet(id);
  };

  render() {
    return (
      <div>
        <ListGroupItemHeading>
          {this.props.tweet.userName} {this.props.tweet.createdAt}
        </ListGroupItemHeading>
        <ListGroupItemText>{this.props.tweet.text}</ListGroupItemText>
        {this.props.myTweet && (
          <Fragment>
            <TweetForm tweet={this.props.tweet} formType="edit">
              Edit Tweet
            </TweetForm>
            <Button
              onClick={this.handleDeleteTweet.bind(this, this.props.tweet._id)}
              outline
              color="danger"
            >
              Delete Tweet
            </Button>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTweet: (id) => dispatch(deleteTweet(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Tweet);
