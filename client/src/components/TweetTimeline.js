import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

export class TweetTimeline extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.tweets.map((tweet, index) => (
          <ListGroupItem>
            <ListGroupItemHeading>Tweet {index + 1}</ListGroupItemHeading>
            <ListGroupItemText>{tweet}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default TweetTimeline;
