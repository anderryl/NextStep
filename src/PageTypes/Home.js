import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Search from "../Components/Search"
import { Layout } from "../Components/Layout"
import Image from 'react-bootstrap/Image'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.category,
      settings: props.settings,
      favorites: props.favorites
    }
    this.college = this.college.bind(this)
    this.scholarship = this.scholarship.bind(this)
    this.apprenticeship = this.apprenticeship.bind(this)
    this.job = this.job.bind(this)
    this.searched = this.searched.bind(this)
  }

  searched(query) {
    this.state.category("Search", query)
  }

  college() {
    this.state.category("College", "")
  }

  scholarship() {
    this.state.category("Scholarships", "")
  }

  apprenticeship() {
    this.state.category("Apprenticeships", "")
  }

  job() {
    this.state.category("Jobs", "")
  }

  render() {

    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Search onSearch = {this.searched} query = "" default = "Search" />
          </Col>
        </Row>
        <hr width = {0}></hr>
        <Row>
          <Col>
            <Image src = {require("../Assets/College-Icon_500x500.png")} onClick={this.college} fluid rounded />
          </Col>
          <Col>
            <Image src = {require("../Assets/Scholarship-Icon_500x500.png")} onClick={this.scholarship} fluid rounded />
          </Col>
        </Row>
        <hr width = {0}></hr>
        <Row>
          <Col>
            <Image src = {require("../Assets/Apprenticeship-Icon_500x500.png")} onClick={this.apprenticeship} fluid rounded />
          </Col>
          <Col>
            <Image src = {require("../Assets/Job-Icon_500x500.png")} onClick={this.job} fluid rounded />
          </Col>
        </Row>
        <hr width = {0}></hr>
        <Row>
          <Col>
            <Image src = {require("../Assets/settings-icon.png")} onClick = {this.state.settings} fluid rounded />
          </Col>
          <Col>
            <Image src = {require("../Assets/favorites-icon.png")} onClick = {this.state.favorites} fluid rounded />
          </Col>
        </Row>
      </Layout>
    )
  }
}
