import React, { Component } from 'react';
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

export class ProfileWidget extends Component {
  render() {
    const {
      name,
      username,
      tweets,
      following,
      followers,
    } = this.props.currentUser;
    return (
      <Card>
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>@{username}</CardSubtitle>
          <CardText>
            <Row>
              <Col xs="4">
                <Row>Tweets</Row>
                <Row>{tweets}</Row>
              </Col>
              <Col xs="4">
                <Row>Following</Row>
                <Row>{following}</Row>
              </Col>
              <Col xs="4">
                <Row>Followers</Row>
                <Row>{followers}</Row>
              </Col>
            </Row>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ProfileWidget;
