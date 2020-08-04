import FirebaseContext from "../Contexts/FirebaseContext"
import UserContext from "../Contexts/UserContext"
import Image from "react-bootstrap/Image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { Component } from "react"

export const OperationBar = (props) => (
  <FirebaseContext.Consumer>
    {
      firebase => (
        <UserContext.Consumer>
          {
            user => {
              if (user && firebase.allowed(user.uid)) {
                return (
                  <Row>
                    <Col>
                      <Image src = {require("../Assets/delete-icon.png")} onClick = {() => {
                          props.delete(firebase)
                          props.category()
                        }} />
                    </Col>
                    <Col>
                      <Image src = {require("../Assets/edit-icon.png")} onClick = {props.edit} />
                    </Col>
                  </Row>
                )
              }
            }
          }
        </UserContext.Consumer>
      )
    }
  </FirebaseContext.Consumer>
)
