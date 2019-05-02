import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from 'reactstrap';
import axios from 'axios';
import TweetForm from './TweetForm';
import Tweet from './Tweet';
import { deleteTweet } from '../actions/tweet';

export class TweetTimeline extends Component {
  state = {
    dataLoaded: false,
    tweets: [],
  };

  componentDidMount() {
    const { username } = this.props;
    if (username) {
      // get user from username, and search for tweets through user id
      axios
        .get(`/api/user/${username}`)
        .then((res) => {
          const { _id } = res.data;
          axios
            .get(`/api/tweet/${_id}`)
            .then((res) => {
              const { tweets } = res.data;
              this.setState({
                dataLoaded: true,
                tweets,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  componentWillUnmount() {
    this.setState({ dataLoaded: false });
  }

  render() {
    return this.state.dataLoaded ? (
      <ListGroup>
        {this.state.tweets.length ? (
          this.state.tweets.map((tweet) => (
            <ListGroupItem key={tweet._id}>
              <Tweet
                tweet={tweet}
                myTweet={tweet.userId === this.props.user._id}
              />
            </ListGroupItem>
          ))
        ) : (
          <div>
            <h2>No tweets yet...</h2>
          </div>
        )}
      </ListGroup>
    ) : (
      <div>
        <h2>Loading tweets...</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTweet: (id) => dispatch(deleteTweet(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetTimeline);
