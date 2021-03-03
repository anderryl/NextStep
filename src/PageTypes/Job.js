import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import OperationBar from "../Components/OperationBar"
import Favicon from "../Components/Favicon"
import { CustomLink } from "../Components/CustomLink"

export class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      pay: props.contents.pay,
      days: props.contents.days,
      work: props.contents.work,
      hours: props.contents.hours,
      description: props.contents.description,
      requirements: props.contents.requirements,
      link: props.contents.link,
      employer: props.contents.employer,
      location: props.contents.location,
      page: props.page,
      home: props.home,
      category: props.category,
      uid: props.uid,
      edit: props.edit
    }
  }

  home = () => {
    this.state.home()
  }

  jobs = () => {
    this.state.category("Jobs", "", null)
  }

  delete = (firebase) => {
    firebase.deleteDocument(this.state.uid)
  }

  edit = () => {
    const content = {
      title: this.state.title,
      blurb: this.state.blurb,
      type: "Jobs",
      uid: this.state.uid,
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
    this.state.edit("JobsEditor", content)
  }

  render = () => {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick = {this.jobs}>
                Jobs
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
          <Col xs = {2}>
            <Favicon uid = {this.state.uid} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Type:</h4>
            <p>{this.state.work}</p>
          </Col>
          <Col>
            <h4>Pay:</h4>
            <p>{this.state.pay}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Days:</h4>
            <p>{this.state.days}</p>
          </Col>
          <Col>
            <h4>Hours:</h4>
            <p>{this.state.hours}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Employer:</h4>
            <p>{this.state.employer}</p>
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
            <CustomLink link = {this.state.link} />
          </Col>
        </Row>
        <hr width = {0}></hr>
        <OperationBar delete = {this.delete} category = {this.jobs} edit = {this.edit} />
      </Layout>
    )
  }
}
