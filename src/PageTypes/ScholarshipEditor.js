import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Form from 'react-bootstrap/Form'
import FirebaseContext from "../Contexts/FirebaseContext"
import Button from 'react-bootstrap/Button'
import { RandomId } from "../RandomId"

export default class ScholarshipEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title ?? "",
      blurb: props.blurb ?? "",
      amount: props.contents.amount ?? "",
      due: props.contents.due ?? "",
      description: props.contents.description ?? "",
      requirements: props.contents.requirements ?? "",
      link: props.contents.link ?? "",
      page: props.page,
      category: props.category,
      uid: props.uid,
      home: props.home
    }
    this.home = this.home.bind(this)
    this.scholarships = this.scholarships.bind(this)
    this.title = this.title.bind(this)
    this.amount = this.amount.bind(this)
    this.due = this.due.bind(this)
    this.description = this.description.bind(this)
    this.requirements = this.requirements.bind(this)
    this.link = this.link.bind(this)
    this.blurb = this.blurb.bind(this)
  }

  home() {
    this.state.home()
  }

  scholarships(content) {
    this.state.category("Scholarships", "", content)
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

  amount(event) {
    this.setState({
      amount: event.target.value
    })
  }

  due(event) {
    this.setState({
      due: event.target.value
    })
  }

  description(event) {
    this.setState({
      description: event.target.value
    })
  }

  requirements(event) {
    this.setState({
      requirements: event.target.value
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
              <Breadcrumb.Item onClick = {() => this.scholarships(null)}>
                Scholarships
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Form>
          <Row>
            <Col>
              <Form.Control size = "lg" type= "text" placeholder = "Title" defaultValue = {this.state.title} onChange = {this.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control size = "sm" type= "text" placeholder = "Blurb" defaultValue = {this.state.blurb} onChange = {this.blurb} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Amount:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" defaultValue = {this.state.amount} onChange = {this.amount} />
            </Col>
            <Col>
              <Form.Label>Due:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" defaultValue = {this.state.due} onChange = {this.due} />
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
              <Form.Label>Requirements:</Form.Label>
              <Form.Control as = "textarea" rows = "3" defaultValue = {this.state.requirements} onChange = {this.requirements} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Link:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" defaultValue = {this.state.link} onChange = {this.link} />
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
                        type: "Scholarships",
                        uid: this.state.uid ?? RandomId(),
                        contents: {
                          amount: this.state.amount,
                          due: this.state.due,
                          description: this.state.description,
                          requirements: this.state.requirements,
                          link: this.state.link
                        }
                      }
                      firebase.setDocument(content.uid, content)
                      this.scholarships(content)
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
