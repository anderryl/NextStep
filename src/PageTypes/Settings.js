import React, { Component } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Search from "../Components/Search"
import { Layout } from "../Components/Layout"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import FirebaseContext from "../Contexts/FirebaseContext"

export const Settings = (props) => {
  return (
    <Layout>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item onClick = {props.home}>Home</Breadcrumb.Item>
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
                    <Button variant="danger" onClick = {firebase.signOut}>Sign Out</Button>
                  </Col>
                </>
              )
            }
            else {
              return (
                <Col>
                  <Image src = {require("../Assets/signin.png")} onClick = {firebase.signIn} fluid rounded />
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
