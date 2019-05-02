import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

export class UsersWidget extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Users</CardTitle>
          <CardText>
            <ListGroup>
              {this.props.users.map((user) => (
                <ListGroupItem>
                  <Link to={`/${user.username}`}>
                    {user.name} | {user.username}
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps)(UsersWidget);
