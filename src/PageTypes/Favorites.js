import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Search from "../Components/Search"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import { Layout } from "../Components/Layout"
import { HeaderWrapper } from "../Components/Wrappers"
import Fuse from "fuse.js"
import DexieContext from "../Contexts/DexieContext"

export default class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: props.contents,
      query: "",
      order: undefined,
      page: props.page,
      home: props.home,
      uid: props.uid,
      allowed: undefined,
      favorites: undefined
    }
  }

  searched = (query) => {
    if (!this.state.order) {
      return
    }
    const fuse = new Fuse(this.state.order, {
      keys: [{
        name: "title",
        weight: 4
      },
      {
        name: "blurb",
        weight: 1
      }]
    })
    const raw = fuse.search(query)
    var item
    var processed = []
    for (item of raw) {
      processed.push(item.item)
    }
    this.setState({
      query: query,
      order: processed
    })
  }

  clicked = (fragment) => {
    this.state.page(fragment.type, fragment)
  }

  home = () => {
    this.state.home()
  }

  render = () => {
    return (
      <DexieContext.Consumer>
        { dexie => {
          var rets = [
            <Row key = "menu">
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Favorites</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>,
            <hr key = "line"></hr>,
            <Row key = "search">
              <Col>
                <Search onSearch = {this.searched} onChange = {this.searched} realtime = {true} query = {this.state.query} default = {"Search"}/>
              </Col>
            </Row>,
            <hr width = {0} key = "mid"></hr>
            ]
          if (this.state.order === undefined) {
            dexie.favorites.toArray().then(favs => {
              var item
              var processed = []
              for (item of this.state.contents) {
                var comp
                for (comp of favs) {
                  if (comp.uid === item.uid) {
                    processed.push(item)
                  }
                }
              }
              this.setState({contents: processed, order: processed})
            })
            return (
              <Layout>
                { rets }
              </Layout>
            )
          }
          var fragment
          var i = 0
          for (fragment of this.state.order) {
            rets.push((
              <Row key = {i.toString()}>
                <Col>
                  <HeaderWrapper onClick = {this.clicked} info = {fragment}>{fragment.title}</HeaderWrapper>
                  <p>{fragment.blurb}</p>
                </Col>
              </Row>
            ))
            i ++
          }
          return (
            <Layout>
              {rets}
            </Layout>
          )
        }}
      </DexieContext.Consumer>
    )
  }
}
