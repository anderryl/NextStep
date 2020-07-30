import React, { Component, Fragment } from 'react';
import db from "./db";
import './App.css';
import { Home } from "./PageTypes/Home";
import { Scholarship } from "./PageTypes/Scholarship";
import { Job } from "./PageTypes/Job";
import { College } from "./PageTypes/College";
import { Apprenticeship } from "./PageTypes/Apprenticeship";
import { Category } from "./PageTypes/Category"

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: "Home",
      contents: {},
      props: {}
    }

    this.category = this.category.bind(this)
    this.page = this.page.bind(this)
    this.home = this.home.bind(this)
    this.load = this.load.bind(this)
    this.update = this.update.bind(this)
    this.load = this.load.bind(this)
  }

  async componentDidMount() {
    window.addEventListener('online', this.update);
    if (navigator.onLine == true) {
      this.update()
    }
    else {
      this.load()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.update);
  }

  async load() {
    var info =  await db.listings.toArray()
    this.setState({
      contents: info
    })
  }

  async update() {
    this.loadJSON("https://bfscholar.s3.amazonaws.com/info.json").then(data => {
      db.transaction('rw', db.listings, async () => {
        db.listings.clear()
        db.listings.bulkAdd(data)
      })
      this.setState({
        contents: data
      })
    })
  }

  async loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
  }

  home() {
    this.setState({
      location: "Home",
      props: {}
    })
  }

  category(type, query) {
    this.setState({
      location: "Category",
      props: {
        type: type,
        query: query
      }
    })
  }

  page(type, fragment) {
    this.setState({
      location: type,
      props: fragment
    })
  }

  render() {
    var ret
    if (this.state.location === "Home") {
      ret = <Home category = {this.category}/>
    }
    else if (this.state.location === "Category") {
      const props = this.state.props
      ret = <Category query = {props.query} type = {props.type} page = {this.page} home = {this.home} contents = {this.state.contents}/>
    }
    else if (this.state.location === "Scholarships") {
      const props = this.state.props
      ret = <Scholarship title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "Jobs") {
      const props = this.state.props
      ret = <Job title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "College") {
      const props = this.state.props
      ret = <College title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "Apprenticeships") {
      const props = this.state.props
      ret = <Apprenticeship title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} />
    }
    return (
      <Fragment>
        { ret }
      </Fragment>
    );
  }
}
