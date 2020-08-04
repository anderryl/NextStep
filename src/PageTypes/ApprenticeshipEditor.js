import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Form from 'react-bootstrap/Form'
import FirebaseContext from "../Contexts/FirebaseContext"
import Button from 'react-bootstrap/Button'

export default class ApprenticeshipEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title ?? "",
      blurb: props.blurb ?? "",
      work: props.contents.work ?? "",
      pay: props.contents.pay ?? "",
      description: props.contents.description ?? "",
      timeframe: props.contents.timeframe ?? "",
      link: props.contents.link ?? "",
      page: props.page,
      category: props.category,
      home: props.home
    }
    this.home = this.home.bind(this)
    this.apprenticeships = this.apprenticeships.bind(this)
    this.title = this.title.bind(this)
    this.pay = this.pay.bind(this)
    this.work = this.work.bind(this)
    this.description = this.description.bind(this)
    this.timeframe = this.timeframe.bind(this)
    this.link = this.link.bind(this)
    this.blurb = this.blurb.bind(this)
  }

  home() {
    this.state.home()
  }

  apprenticeships(content) {
    this.state.category("Apprenticeships", "", content)
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

  pay(event) {
    this.setState({
      pay: event.target.value
    })
  }

  work(event) {
    this.setState({
      work: event.target.value
    })
  }

  description(event) {
    this.setState({
      description: event.target.value
    })
  }

  timeframe(event) {
    this.setState({
      timeframe: event.target.value
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
              <Breadcrumb.Item onClick = {this.apprenticeships}>
                Apprenticeships
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Form>
          <Row>
            <Col>
              <Form.Control size = "lg" type= "text" placeholder = "Title" onChange = {this.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control size = "sm" type= "text" placeholder = "Blurb" onChange = {this.blurb} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Work:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" onChange = {this.work} />
            </Col>
            <Col>
              <Form.Label>Pay:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" onChange = {this.pay} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Timeframe:</Form.Label>
              <Form.Control as = "textarea" rows = "3" onChange = {this.timeframe} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Description:</Form.Label>
              <Form.Control as = "textarea" rows = "3" onChange = {this.description} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Link:</Form.Label>
              <Form.Control size = "sm" type = "text" placeholder = "" onChange = {this.link} />
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
                        type: "Apprenticeships",
                        contents: {
                          pay: this.state.pay,
                          work: this.state.work,
                          description: this.state.description,
                          timeframe: this.state.timeframe,
                          link: this.state.link
                        }
                      }
                      firebase.setDocument(content)
                      this.apprenticeships(content)
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
