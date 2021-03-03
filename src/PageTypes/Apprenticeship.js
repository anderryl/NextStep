import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Layout } from "../Components/Layout"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import OperationBar from "../Components/OperationBar"
import Favicon from "../Components/Favicon"
import { CustomLink } from "../Components/CustomLink"

export class Apprenticeship extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      work: props.contents.work,
      pay: props.contents.pay,
      description: props.contents.description,
      timeframe: props.contents.timeframe,
      link: props.contents.link,
      home: props.home,
      category: props.category,
      uid: props.uid,
      edit: props.edit
    }
  }

  home = () => {
    this.state.home()
  }

  apprenticeships = () => {
    this.state.category("Apprenticeships", "", null)
  }

  delete = (firebase) => {
    firebase.deleteDocument(this.state.uid)
  }

  edit = () => {
    const content = {
      title: this.state.title,
      blurb: this.state.blurb,
      type: "Apprenticeships",
      uid: this.state.uid,
      contents: {
        pay: this.state.pay,
        work: this.state.work,
        description: this.state.description,
        timeframe: this.state.timeframe,
        link: this.state.link
      }
    }
    this.state.edit("ApprenticeshipsEditor", content)
  }

  render = () => {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.home}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick = {this.apprenticeships}>
                Apprenticeships
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {this.state.title}
              </Breadcrumb.Item>
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
            <h4>Timeframe:</h4>
            <p>{this.state.timeframe}</p>
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
            <CustomLink link = {this.state.link} />
          </Col>
        </Row>
        <hr width = {0}></hr>
        <OperationBar delete = {this.delete} category = {this.apprenticeships} edit = {this.edit} />
      </Layout>
    )
  }
}
