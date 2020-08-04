import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import FirebaseContext from "../Contexts/FirebaseContext"
import UserContext from "../Contexts/UserContext"
import Image from "react-bootstrap/Image"
import { OperationBar } from "../Components/OperationBar"

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
      home: props.home,
      edit: props.edit
    }
    this.home = this.home.bind(this)
    this.scholarships = this.scholarships.bind(this)
    this.delete = this.delete.bind(this)
    this.edit = this.edit.bind(this)
  }

  home() {
    this.state.home()
  }

  scholarships() {
    this.state.category("Scholarships", "", null)
  }

  delete(firebase) {
    const content = {
      title: this.state.title,
      blurb: this.state.blurb,
      type: "Scholarships",
      contents: {
        amount: this.state.amount,
        due: this.state.due,
        description: this.state.description,
        requirements: this.state.requirements,
        link: this.state.link
      }
    }
    firebase.deleteDocument(content)
  }

  edit() {
    const content = {
      title: this.state.title,
      blurb: this.state.blurb,
      type: "Scholarships",
      contents: {
        amount: this.state.amount,
        due: this.state.due,
        description: this.state.description,
        requirements: this.state.requirements,
        link: this.state.link
      }
    }
    this.state.edit("ScholarshipsEditor", content)
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
        <OperationBar delete = {this.delete} category = {this.scholarships} edit = {this.edit} />
      </Layout>
    )
  }
}
