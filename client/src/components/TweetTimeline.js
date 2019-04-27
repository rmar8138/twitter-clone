import React, { Component } from 'react';
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

export class TweetTimeline extends Component {
  handleDeleteTweet = (id, e) => {
    e.preventDefault();
    this.props.deleteTweet(id);
  };

  render() {
    return (
      <ListGroup>
        {this.props.tweets.map((tweet) => (
          <ListGroupItem key={tweet._id}>
            <ListGroupItemHeading>
              {tweet.userName} {tweet.createdAt}
            </ListGroupItemHeading>
            <ListGroupItemText>{tweet.text}</ListGroupItemText>
            <TweetForm tweet={tweet} formType="edit">
              Edit Tweet
            </TweetForm>
            <Button
              onClick={this.handleDeleteTweet.bind(this, tweet._id)}
              outline
              color="danger"
            >
              Delete Tweet
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  tweets: state.tweet.tweets,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTweet: (id) => dispatch(deleteTweet(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetTimeline);
