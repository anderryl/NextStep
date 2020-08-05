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
    this.signIn = this.signIn.bind(this)
    this.changed = this.changed.bind(this)
    this.callback = callback
    this.contents = undefined

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

  async retreiveContents() {
    const snapshot = await this.firestore.collection('content').get()
    const ret = snapshot.docs.map(doc => doc.data());
    return ret
  }

  allowed(uid) {
    const allow = [
      "71V8Nwja2AeKWTPF5lBNI054vbC2"
    ]
    var perm
    for (perm of allow) {
      if (uid === perm) {
        return true
      }
    }
    return false
  }

  async setDocument(fragment) {
    this.firestore.collection('content').doc(fragment.title).set(fragment);
  }

  async deleteDocument(fragment) {
    this.firestore.collection('content').doc(fragment.title).delete()
  }
}

export default Firebase
