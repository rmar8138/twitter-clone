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

export class ProfileWidget extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>name</CardTitle>
          <CardSubtitle>username</CardSubtitle>
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
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileWidget);
