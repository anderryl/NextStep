import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Form from 'react-bootstrap/Form'
import FirebaseContext from "../Contexts/FirebaseContext"
import Button from 'react-bootstrap/Button'
import { RandomId } from "../RandomId"

export default class CollegeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title ?? "",
      blurb: props.blurb ?? "",
      description: props.contents.description ?? "",
      link: props.contents.link ?? "",
      page: props.page,
      category: props.category,
      uid: props.uid,
      operation: props.operation,
      home: props.home
    }
    this.home = this.home.bind(this)
    this.college = this.college.bind(this)
    this.title = this.title.bind(this)
    this.description = this.description.bind(this)
    this.link = this.link.bind(this)
    this.blurb = this.blurb.bind(this)
  }

  home() {
    this.state.home()
  }

  college(content) {
    this.state.category("College", "", content)
  }

  title(event) {
    this.setState({
      title: event.target.value
    })
  }

  blurb(event) {
    this.setState({
      blurb: event.target.value
    })
  }

  description(event) {
    this.setState({
      description: event.target.value
    })
  }

  link(event) {
    this.setState({
      link: event.target.value
    })
  }

  render() {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick = {() => this.college(null)}>
                College
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Form>
          <Row>
            <Col>
              <Form.Control size = "lg" type= "text" defaultValue = {this.state.title} placeholder = "Title" onChange = {this.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control size = "sm" type= "text" defaultValue = {this.state.blurb} placeholder = "Blurb" onChange = {this.blurb} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Description:</Form.Label>
              <Form.Control as = "textarea" rows = "3" defaultValue = {this.state.description} onChange = {this.description} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Link:</Form.Label>
              <Form.Control size = "sm" type = "text" defaultValue = {this.state.link} placeholder = "" onChange = {this.link} />
            </Col>
          </Row>
          <FirebaseContext.Consumer>
            {
              firebase => (
                <Row>
                  <Col>
                    <Button variant="outline-success" onClick = {() => {
                      const content = {
                        title: this.state.title,
                        blurb: this.state.blurb,
                        type: "College",
                        uid: this.state.uid ?? RandomId(),
                        contents: {
                          description: this.state.description,
                          link: this.state.link
                        }
                      }
                      if (this.state.operation === "EDIT") {
                        firebase.setDocument(content.uid, content)
                      }
                      else {
                        firebase.setDocument(content.uid, content)
                      }
                      this.college(content)
                  }}>Save</Button>
                  </Col>
                </Row>
              )
            }
          </FirebaseContext.Consumer>
        </Form>
      </Layout>
    )
  }
}
