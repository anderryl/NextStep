import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export class College extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.contents.description,
      link: props.contents.link,
      page: props.page,
      home: props.home,
      category: props.category
    }
    this.home = this.home.bind(this)
    this.college = this.college.bind(this)
  }

  home() {
    this.state.home()
  }

  college() {
    this.state.category("College", "", null)
  }

  render() {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick = {this.college}>
                College
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
            <h4>Description:</h4>
            <p>{this.state.description}</p>
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
