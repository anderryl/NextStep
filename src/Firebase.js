import app from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDiYPifBrkUSOHLJjbjjdzrz5qew3rMLns",
  authDomain: "nextstep-5f04d.firebaseapp.com",
  databaseURL: "https://nextstep-5f04d.firebaseio.com",
  projectId: "nextstep-5f04d",
  storageBucket: "nextstep-5f04d.appspot.com",
  messagingSenderId: "677609880548",
  appId: "1:677609880548:web:9723a75eb140f38bf165f1",
  measurementId: "G-DH1DGMJP3C"
}

class Firebase {
  constructor(callback) {
    if (!app.apps.length) {
      app.initializeApp(config)
    }
    this.auth = app.auth()
    this.firestore = app.firestore()
    this.user = null
    this.token = null
    this.callback = callback
    this.contents = undefined
    this.allowed = undefined

    app.auth().onAuthStateChanged(user => this.changed(user))
  }

  changed = (user) => {
    this.user = user
    console.log(user)
    this.callback(user)
  }

  // *** Auth API ***

  signIn = () => {
    app.auth().getRedirectResult().then(result => {
      if (result.credential) {
        this.token = result.credential.accessToken;
      }

      console.log(result.user);
      this.user = result.user;
      this.callback(result.user);
    }).catch(function(error) {
      alert(error.message)
    })

    var provider = new app.auth.GoogleAuthProvider()
    this.auth.signInWithRedirect(provider)
  }

  signOut = () => {
    this.auth.signOut()
  }

  currentUser = () => {
    if (this.user) {
      return this.user
    }
    return this.auth.currentUser
  }

  retreiveContents = async () => {
    const snapshot = await this.firestore.collection('content').get()
    const ret = snapshot.docs.map(doc => doc.data());
    return ret
  }

  allowedUser = async (uid) => {
    if (this.allowed) {
      var perm
      for (perm of this.allowed) {
        if (uid === perm.uid) {
          return true
        }
      }
      return false
    }
    const snapshot = await this.firestore.collection('allowed-users').get()
    const list = snapshot.docs.map(doc => doc.data())
    this.allowed = list
    console.log(list)
    var perm
    for (perm of list) {
      if (uid === perm.uid) {
        return true
      }
    }
    return false
  }

  setDocument = async (id, fragment) => {
    this.firestore.collection('content').doc(id).set(fragment);
  }

  deleteDocument = async (id) => {
    this.firestore.collection('content').doc(id).delete()
  }
}

export default Firebase
