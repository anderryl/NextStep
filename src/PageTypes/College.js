import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { OperationBar } from "../Components/OperationBar"

export class College extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.contents.description,
      link: props.contents.link,
      page: props.page,
      home: props.home,
      category: props.category,
      uid: props.uid,
      edit: props.edit
    }
    this.home = this.home.bind(this)
    this.college = this.college.bind(this)
    this.delete = this.delete.bind(this)
    this.edit = this.edit.bind(this)
  }

  home() {
    this.state.home()
  }

  college() {
    this.state.category("College", "", null)
  }

  delete(firebase) {
    firebase.deleteDocument(this.state.uid)
  }

  edit() {
    const content = {
      title: this.state.title,
      blurb: this.state.blurb,
      type: "College",
      uid: this.state.uid,
      contents: {
        description: this.state.description,
        link: this.state.link
      }
    }
    this.state.edit("CollegeEditor", content)
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
        <hr width = {0}></hr>
        <OperationBar delete = {this.delete} category = {this.college} edit = {this.edit} />
      </Layout>
    )
  }
}
