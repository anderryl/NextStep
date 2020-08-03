import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export class Scholarship extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      amount: props.contents.amount,
      due: props.contents.due,
      description: props.contents.description,
      requirements: props.contents.requirements,
      link: props.contents.link,
      page: props.page,
      category: props.category,
      home: props.home
    }
    this.home = this.home.bind(this)
    this.scholarships = this.scholarships.bind(this)
  }

  home() {
    this.state.home()
  }

  scholarships() {
    this.state.category("Scholarships", "", null)
  }

  render() {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick = {this.scholarships}>
                Scholarships
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <h1>{this.state.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Amount:</h4>
            <p>{this.state.amount}</p>
          </Col>
          <Col>
            <h4>Due:</h4>
            <p>{this.state.due}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Description:</h4>
            <p>{this.state.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Requirements:</h4>
            <p>{this.state.requirements}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Apply:</h4>
            <a href={"https://" + this.state.link}>{this.state.link}</a>
          </Col>
        </Row>
      </Layout>
    )
  }
}
