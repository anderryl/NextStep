import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Layout } from "../Components/Layout"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import FirebaseContext from "../Contexts/FirebaseContext"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: props.home
    }
  }

  render = () => {
    return (
      <Layout>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick = {this.state.home}>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Settings</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <FirebaseContext.Consumer>
          {
            firebase => {
              if (!firebase) {
                return
              }
              const user = firebase.currentUser()
              if (user) {
                return (
                  <>
                    <Col xs = {8}>
                      <h2>{user.displayName}</h2>
                    </Col>
                    <Col xs = {4}>
                      <Button variant="danger" onClick = {() => {
                          firebase.signOut()
                          this.state.home()
                        }}>Sign Out</Button>
                    </Col>
                  </>
                )
              }
              else {
                return (
                  <Col>
                    <Image src = {require("../Assets/signin.png")} onClick = {() => {
                        firebase.signIn()
                      }} fluid rounded />
                  </Col>
                )
              }
            }
          }
          </FirebaseContext.Consumer>
        </Row>
      </Layout>
    )
  }

}

export default Settings
