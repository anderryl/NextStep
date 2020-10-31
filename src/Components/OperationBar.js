import React, { Component } from "react"
import FirebaseContext from "../Contexts/FirebaseContext"
import Image from "react-bootstrap/Image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

class OperationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: props.edit,
      delete: props.delete,
      category: props.category,
      allowed: undefined,
      confirmation: false
    }
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          firebase => {
            if (!firebase) {
              return
            }
            const user = firebase.currentUser()
            if (!user) {
              return
            }
            if (this.state.allowed === undefined) {
              firebase.allowedUser(user.uid).then(bool => {
                this.setState({allowed: bool})
              })
            }

            if (this.state.allowed) {
              if (this.state.confirmation) {
                return (
                  <Alert variant="danger" onClose={() => { this.setState({confirmation: false}) }} dismissible>
                    <Alert.Heading>Are you sure?</Alert.Heading>
                    <p>
                      By clicking the button below, you irreversibly delete this entry.
                    </p>
                    <Button variant="danger" onClick = {() => {
                        this.state.delete(firebase)
                        this.state.category()
                      }} block>Delete</Button>
                  </Alert>
                )
              }
              return (
                <Row>
                  <Col>
                    <Image src = {require("../Assets/delete-icon.png")} fluid rounded onClick = {() => {
                        this.setState({confirmation: true})
                      }} />
                  </Col>
                  <Col>
                    <Image src = {require("../Assets/edit-icon.png")} fluid rounded onClick = {this.state.edit} />
                  </Col>
                </Row>
              )
            }
          }
        }
      </FirebaseContext.Consumer>
    )
  }
}

export default OperationBar;
