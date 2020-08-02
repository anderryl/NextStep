import app from 'firebase/app';
import 'firebase/auth';

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
    this.user = null
    this.token = null
    this.signIn = this.signIn.bind(this)
    this.changed = this.changed.bind(this)
    this.callback = callback

    app.auth().onAuthStateChanged(user => this.changed(user))
  }

  changed(user) {
    this.callback(user)
  }

  // *** Auth API ***

  signIn() {
    app.auth().getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      this.user = result.user;
    }).catch(function(error) {
      alert(error.message)
    })

    var provider = new app.auth.GoogleAuthProvider()
    this.auth.signInWithRedirect(provider)
  }

  signOut() {
    this.auth.signOut()
  }

  currentUser() {
    if (this.user) {
      return this.user
    }
    return this.auth.currentUser
  }
}

export default Firebase
