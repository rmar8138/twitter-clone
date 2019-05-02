import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';

export class ProfileWidget extends Component {
  state = {
    dataLoaded: false,
    user: {
      _id: null,
      name: null,
      username: null,
      email: null,
      createdAt: null,
    },
  };

  componentDidMount() {
    const { username } = this.props;

    // get user info
    axios
      .get(`/api/user/${username}`)
      .then((res) => {
        this.setState({
          dataLoaded: true,
          user: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.setState({ dataLoaded: false });
  }

  render() {
    const { name, username } = this.state.user;
    return this.state.dataLoaded ? (
      <Card>
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{username}</CardSubtitle>
          <CardSubtitle>
            {this.state.user._id === this.props.user._id && 'This you brah'}
          </CardSubtitle>
          <CardText>
            <Row>
              <Col xs="4">
                <Row>Tweets</Row>
                <Row>1</Row>
              </Col>
              <Col xs="4">
                <Row>Following</Row>
                <Row>1</Row>
              </Col>
              <Col xs="4">
                <Row>Followers</Row>
                <Row>1</Row>
              </Col>
            </Row>
          </CardText>
        </CardBody>
      </Card>
    ) : (
      <div>Loading user</div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileWidget);
