import FirebaseContext from "../Contexts/FirebaseContext"
import Image from "react-bootstrap/Image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from "react"

export const OperationBar = (props) => (
  <FirebaseContext.Consumer>
    {
      firebase => {
        if (!firebase) {
          return
        }
        const user = firebase.currentUser()
        if (user && firebase.allowed(user.uid)) {
          return (
            <Row>
              <Col>
                <Image src = {require("../Assets/delete-icon.png")} fluid rounded onClick = {() => {
                    props.delete(firebase)
                    props.category()
                  }} />
              </Col>
              <Col>
                <Image src = {require("../Assets/edit-icon.png")} fluid rounded onClick = {props.edit} />
              </Col>
            </Row>
          )
        }
      }
    }
  </FirebaseContext.Consumer>
)
