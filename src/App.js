import React, { Component, Fragment } from 'react';
import db from "./db";
import './App.css';
import { Home } from "./PageTypes/Home";
import { Scholarship } from "./PageTypes/Scholarship";
import { Job } from "./PageTypes/Job";
import { College } from "./PageTypes/College";
import { Apprenticeship } from "./PageTypes/Apprenticeship";
import { Category } from "./PageTypes/Category"
import FirebaseContext from "./Contexts/FirebaseContext"
import UserContext from "./Contexts/UserContext"
import Firebase from "./Firebase"
import JobEditor from "./PageTypes/JobEditor"
import ScholarshipEditor from "./PageTypes/ScholarshipEditor"
import CollegeEditor from "./PageTypes/CollegeEditor"
import ApprenticeshipEditor from "./PageTypes/ApprenticeshipEditor"

export class App extends Component {
  constructor(props) {
    super(props)

    this.category = this.category.bind(this)
    this.page = this.page.bind(this)
    this.home = this.home.bind(this)
    this.updateDexie = this.updateDexie.bind(this)
    this.loadDexie = this.loadDexie.bind(this)
    this.refreshDexie = this.refreshDexie.bind(this)
    this.refresher = this.refresh.bind(this)
    this.add = this.add.bind(this)

    this.state = {
      location: "Home",
      contents: {},
      props: {},
      firebase: null,
      user: undefined,
      token: undefined
    }
  }

  async componentDidMount() {
    var fire = new Firebase(this.refresher)
    window.addEventListener('online', this.update)
    if (navigator.onLine === true) {
      this.updateDexie(fire)
    }
    else {
      this.loadDexie(fire)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.update)
  }

  refreshDexie() {
    this.loadDexie(this.state.firebase)
  }

  async loadDexie(firebase) {
    var info =  await db.listings.toArray()
    this.setState({
      contents: info,
      firebase: firebase
    })
  }

  async updateDexie(firebase) {
    var cont = await firebase.retreiveContents()
    db.transaction('rw', db.listings, async () => {
      db.listings.clear()
      db.listings.bulkAdd(cont)
    })
    this.setState({
      contents: cont,
      firebase: firebase
    })
  }

  async loadJSON(url) {
    const res = await fetch(url)
    return await res.json()
  }

  refresh(user) {
    if (user) {
      this.setState({
        user: user,
        token: user.getIdToken()
      })
    }
    this.setState({
      user: user
    })

  }

  home() {
    this.setState({
      location: "Home",
      props: {}
    })
  }

  async category(type, query, fragment) {
    if (fragment) {
      this.setState({
        location: "Category",
        contents: this.state.contents.concat([fragment]),
        props: {
          type: type,
          query: query
        }
      })
    }
    else {
      this.setState({
        location: "Category",
        props: {
          type: type,
          query: query
        }
      })
    }
  }

  page(type, fragment) {
    this.setState({
      location: type,
      props: fragment
    })
  }

  add(type) {
    this.setState({
      location: type,
      props: {
        contents: {}
      }
    })
  }

  render() {
    var ret
    if (this.state.location === "Home") {
      ret = <Home category = {this.category}/>
    }
    else if (this.state.location === "Category") {
      const props = this.state.props
      ret = <Category query = {props.query} type = {props.type} page = {this.page} home = {this.home} add = {this.add} contents = {this.state.contents}/>
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
    else if (this.state.location === "ScholarshipsEditor") {
      const props = this.state.props
      ret = <ScholarshipEditor title = {props.title} contents = {{}} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "JobsEditor") {
      const props = this.state.props
      ret = <JobEditor title = {props.title} contents = {{}} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "ApprenticeshipsEditor") {
      const props = this.state.props
      ret = <ApprenticeshipEditor title = {props.title} contents = {{}} page = {this.page} home = {this.home} category = {this.category} />
    }
    else if (this.state.location === "CollegeEditor") {
      const props = this.state.props
      ret = <CollegeEditor title = {props.title} contents = {{}} page = {this.page} home = {this.home} category = {this.category} />
    }
    return (
      <Fragment>
        <FirebaseContext.Provider value = {this.state.firebase}>
          <UserContext.Provider value = {this.state.user} >
            { ret }
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Fragment>
    );
  }
}
