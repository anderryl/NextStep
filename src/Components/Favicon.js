import Image from "react-bootstrap/Image"
import React, { Component } from "react"
import DexieContext from "../Contexts/DexieContext"

class Favicon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: props.uid,
      status: undefined
    }
  }

  render = () => {
    return (
      <DexieContext.Consumer>
        {
          dexie => {
            if (this.state.status === undefined) {
              dexie.favorites.where("uid").equals(this.state.uid).toArray().then(result => this.setState({status: result[0] !== undefined}))
            }
            if (this.state.status) {
              return (
                <Image src = {require("../Assets/favorite.png")} onClick = {() => {
                  dexie.favorites.where("uid").equals(this.state.uid).delete()
                  this.setState({status: false})
                }} />
              )
            }
            else {
              return (
                <Image src = {require("../Assets/unfavorite.png")} onClick = {() => {
                  dexie.favorites.add({uid: this.state.uid})
                  this.setState({status: true})
                }} />
              )
            }
          }
        }
      </DexieContext.Consumer>
    )
  }
}

export default Favicon
