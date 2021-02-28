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
import Firebase from "./Firebase"
import JobEditor from "./PageTypes/JobEditor"
import ScholarshipEditor from "./PageTypes/ScholarshipEditor"
import CollegeEditor from "./PageTypes/CollegeEditor"
import ApprenticeshipEditor from "./PageTypes/ApprenticeshipEditor"
import Settings from "./PageTypes/Settings"
import { forceUpdate } from "./ForceUpdate"
import DexieContext from "./Contexts/DexieContext"
import Favorites from "./PageTypes/Favorites"

export class App extends Component {
  constructor(props) {
    //Initiate new App
    super(props)


    //Set preliminary state
    this.state = {
      location: "Home",
      contents: {},
      props: {},
      firebase: null
    }
  }

  componentDidMount = async () => {
    //Retreive info from local database if possible
    const info = await db.listings.toArray()
    //Create firebase object with user refresh callback
    var fire = new Firebase(this.refresher)
    //Insert contents and firebase into state
    this.setState({
      contents: info,
      firebase: fire
    })
    //Add listener for window connecting to network
    window.addEventListener('online', () => this.updateDexie(this.state.firebase))
    //If navigator
    if (navigator.onLine === true) {
      this.updateDexie(fire)
    }
    this.addOpenListener()
  }

  componentWillUnmount = () => {
    //Remove listener before app closes
    window.removeEventListener('online', () => this.updateDexie(this.state.firebase))
    this.removeOpenListener()
  }

  addOpenListener = () => {
    var visibilityChange;
    if (typeof document.hidden !== undefined) {
      visibilityChange = "visibilitychange";
    }
    else if (typeof document.mozHidden !== undefined) {
      visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document.msHidden !== undefined) {
      visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== undefined) {
      visibilityChange = "webkitvisibilitychange";
    }

    window.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  removeOpenListener = () => {
    var visibilityChange;
    if (typeof document.hidden !== undefined) {
      visibilityChange = "visibilitychange";
    }
    else if (typeof document.mozHidden !== undefined) {
      visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document.msHidden !== undefined) {
      visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== undefined) {
      visibilityChange = "webkitvisibilitychange";
    }

    window.removeEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      forceUpdate()
    }
  }

  updateDexie = async (firebase) => {
    var cont = await firebase.retreiveContents()
    //Write those contents to the local dexie database
    db.transaction('rw', db.listings, async () => {
      db.listings.clear()
      db.listings.bulkAdd(cont)
    })
    //Insert new contents into state, triggering a rerender
    this.setState({
      contents: cont
    })
  }

  refresher = (user) => {
    forceUpdate()
  }

  home = () => {
    //Set navigation target to home with no props
    this.setState({
      location: "Home",
      props: {}
    })
  }

  category = async (type, query, fragment) => {
    //Set navigation target to category with query as props
    //If there is an add-fragment, append new fragment to the contents list
    if (fragment) {
      var c = this.state.contents.filter(file => file.uid !== fragment.uid)
      this.setState({
        location: "Category",
        contents: c.concat([fragment]),
        props: {
          type: type,
          query: query
        }
      })
    }
    //If not, simply set target to category with query as props
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

  page = (type, fragment) => {
    //Navigate to a specific page type with specific props
    this.setState({
      location: type,
      props: fragment
    })
  }

  settings = () => {
    this.setState({
      location: "Settings",
      props: {}
    })
  }

  add = (type) => {
    //Navigate to a new editor page of a specific type
    this.setState({
      location: type,
      props: {
        contents: {}
      },
      info: "ADD"
    })
  }

  favorites = () => {
    this.setState({
      location: "Favorites",
    })
  }

  edit = (type, fragment) => {
    var file
    for (file of this.state.contents) {
      if (file.uid === fragment.uid) {
        break
      }
    }
    this.setState({
      location: type,
      props: file,
      info: "EDIT"
    })
  }

  render = () => {
    //Render a specific page based on navigation target
    var ret
    if (this.state.location === "Home") {
      ret = <Home category = {this.category} settings = {this.settings} favorites = {this.favorites} />
    }
    else if (this.state.location === "Settings") {
      ret = <Settings home = {this.home} />
    }
    else if (this.state.location === "Category") {
      const props = this.state.props
      ret = <Category query = {props.query} type = {props.type} page = {this.page} home = {this.home} add = {this.add} contents = {this.state.contents} />
    }
    else if (this.state.location === "Favorites") {
      ret = <Favorites page = {this.page} home = {this.home} contents = {this.state.contents} />
    }
    else if (this.state.location === "Scholarships") {
      const props = this.state.props
      ret = <Scholarship title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category}  edit = {this.edit} uid = {props.uid} />
    }
    else if (this.state.location === "Jobs") {
      const props = this.state.props
      ret = <Job title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category}  edit = {this.edit} uid = {props.uid} />
    }
    else if (this.state.location === "College") {
      const props = this.state.props
      ret = <College title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category}  edit = {this.edit} uid = {props.uid} />
    }
    else if (this.state.location === "Apprenticeships") {
      const props = this.state.props
      ret = <Apprenticeship title = {props.title} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category}  edit = {this.edit} uid = {props.uid} />
    }
    else if (this.state.location === "ScholarshipsEditor") {
      const props = this.state.props
      ret = <ScholarshipEditor title = {props.title} blurb = {props.blurb} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} uid = {props.uid} />
    }
    else if (this.state.location === "JobsEditor") {
      const props = this.state.props
      ret = <JobEditor title = {props.title} blurb = {props.blurb} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} uid = {props.uid} operation />
    }
    else if (this.state.location === "ApprenticeshipsEditor") {
      const props = this.state.props
      ret = <ApprenticeshipEditor title = {props.title} blurb = {props.blurb} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} uid = {props.uid} />
    }
    else if (this.state.location === "CollegeEditor") {
      const props = this.state.props
      ret = <CollegeEditor title = {props.title} blurb = {props.blurb} contents = {props.contents} page = {this.page} home = {this.home} category = {this.category} uid = {props.uid} />
    }

    //Surround the render with context values
    return (
      <Fragment>
        <FirebaseContext.Provider value = {this.state.firebase}>
          <DexieContext.Provider value = {db}>
            { ret }
          </DexieContext.Provider>
        </FirebaseContext.Provider>
      </Fragment>
    );
  }
}
