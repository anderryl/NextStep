import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from "../Components/Search";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Layout } from "../Components/Layout"
import { HeaderWrapper } from "../Components/Wrappers"
import Fuse from "fuse.js"

export class Category extends Component {
  constructor(props) {
    super(props);
    /*let query = this.props.location.search
    var proccessing = query.replace(/%20/g, " ")
    proccessing = proccessing.slice(1, query.length)
    let type = proccessing.replace(/%27/g, "'")
    this.state = {
      type: type,
      query: type,
      listing: [],
    };
    this.loadJSON("https://bfscholar.s3.amazonaws.com/info.json").then(data => {
      this.setState({
        listing: data
      })
    })*/
    var processed = []
    if (props.type !== "Search") {
      var item
      for (item of props.contents) {
        if (item.type === props.type) {
          processed.push(item)
        }
      }
    }
    else {
      processed = props.contents
    }
    this.state = {
      type: props.type,
      query: props.query,
      contents: processed,
      order: processed,
      page: props.page,
      home: props.home
    }
    this.clicked = this.clicked.bind(this)
    this.home = this.home.bind(this)
    this.searched = this.searched.bind(this)
  }

  componentDidMount() {
    if (this.state.query !== "" && this.state.query !== undefined) {
      this.searched(this.state.query)
    }
  }

  searched(query) {
    const fuse = new Fuse(this.state.contents, {
      keys: [{
        name: "title",
        weight: 4
      },
      {
        name: "blurb",
        weight: 2
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
    });
  }

  clicked(fragment) {
    this.state.page(fragment.type, fragment)
  }

  home() {
    this.state.home()
  }

  render () {
    var rets = [
      <Row key = "menu">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item onClick = {this.home}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{this.state.type}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>,
      <hr key = "line"></hr>,
      <Row key = "search">
        <Col>
          <Search onSearch = { this.searched } onChange = {this.searched} realtime = {true} query = {this.state.query} default = {"Search"}/>
        </Col>
      </Row>,
      <hr width = {0} key = "mid"></hr>
      ]
    var fragment;
    var i = 0
    for (fragment of this.state.order) {
      rets.push((
        <Row key = {i.toString()}>
          <Col>
            <HeaderWrapper onClick = {this.clicked} info = {fragment}>{fragment.title}</HeaderWrapper>
            <p>{fragment.blurb}</p>
          </Col>
        </Row>
      ));
      i ++
    }
    return (
      <Layout>
        {rets}
      </Layout>
    )
  }
}
