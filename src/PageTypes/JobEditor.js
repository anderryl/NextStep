import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Form from 'react-bootstrap/Form'
import FirebaseContext from "../Contexts/FirebaseContext"
import Button from 'react-bootstrap/Button'
import { RandomId } from "../RandomId"

export default class JobEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title ?? "",
      pay: props.contents.pay ?? "",
      work: props.contents.work ?? "",
      days: props.contents.days ?? "",
      hours: props.contents.hours ?? "",
      employer: props.contents.employer ?? "",
      location: props.contents.location ?? "",
      description: props.contents.description ?? "",
      requirements: props.contents.requirements ?? "",
      link: props.contents.link ?? "",
      page: props.page,
      category: props.category,
      home: props.home,
      uid: props.uid,
      blurb: props.blurb ?? ""
    }
  }

  home = () => {
    this.state.home()
  }

  jobs = (content) => {
    this.state.category("Jobs", "", content)
  }

  title = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  blurb = (event) => {
    this.setState({
      blurb: event.target.value
    })
  }

  pay = (event) => {
    this.setState({
      pay: event.target.value
    })
  }

  days = (event) => {
    this.setState({
      days: event.target.value
    })
  }

  description = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  requirements = (event) => {
    this.setState({
      requirements: event.target.value
    })
  }

  link = (event) => {
    this.setState({
      link: event.target.value
    })
  }

  work = (event) => {
    this.setState({
      work: event.target.value
    })
  }

  hours = (event) => {
    this.setState({
      hours: event.target.value
    })
  }

  employer = (event) => {
    this.setState({
      employer: event.target.value
    })
  }

  location = (event) => {
    this.setState({
      location: event.target.value
    })
  }

  render = () => {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick = {() => this.jobs(null)}>
                Jobs
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
              <Form.Label>Job:</Form.Label>
              <Form.Control size = "sm" type = "text" defaultValue = {this.state.work} placeholder = "" onChange = {this.work} />
            </Col>
            <Col>
              <Form.Label>Pay:</Form.Label>
              <Form.Control size = "sm" type = "text" defaultValue = {this.state.pay} placeholder = "" onChange = {this.pay} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Days:</Form.Label>
              <Form.Control size = "sm" defaultValue = {this.state.days} type = "text" onChange = {this.days} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Hours:</Form.Label>
              <Form.Control size = "sm" defaultValue = {this.state.hours} type = "text" onChange = {this.hours} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Employer:</Form.Label>
              <Form.Control as = "textarea" defaultValue = {this.state.employer} rows = "3" onChange = {this.employer} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Where:</Form.Label>
              <Form.Control size = "sm" type = "text" defaultValue = {this.state.location} onChange = {this.location} />
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
              <Form.Control size = "sm" type = "text" defaultValue = {this.state.link} placeholder = "" onChange = {this.link} />
            </Col>
          </Row>
          <Row>
            <Col>
            <FirebaseContext.Consumer>
              {
                firebase => (
                  <Button variant="outline-success" onClick = {() => {
                    const content = {
                      title: this.state.title,
                      blurb: this.state.blurb,
                      type: "Jobs",
                      uid: this.state.uid ?? RandomId(),
                      contents: {
                        work: this.state.work,
                        pay: this.state.pay,
                        days: this.state.days,
                        hours: this.state.hours,
                        employer: this.state.employer,
                        location: this.state.location,
                        description: this.state.description,
                        requirements: this.state.requirements,
                        link: this.state.link
                      }
                    }
                    firebase.setDocument(content.uid, content)
                    this.jobs(content)
                }}>Save</Button>
                )
              }
            </FirebaseContext.Consumer>
            </Col>
          </Row>
        </Form>
      </Layout>
    )
  }
}
