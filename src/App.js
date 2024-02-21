import React, { Component } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      message: "",
      type: 1,
    };
  }
  pageSwitchHandler = (event) => {
    this.setState({ page: !this.state.page, message: null });
    event.preventDefault();
  };
  registrationHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (password !== confirmPassword) {
      this.setState({ message: "Passwords do not match!", type: 0 });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        this.setState({ message: "Registered succesfully!", type: 1 }, () => {
          event.target.email.value = "";
          event.target.password.value = "";
          event.target.confirmPassword.value = "";
        });
      })
      .catch((error) => {
        this.setState({ message: error.message, type: 0 });
      });
  };
  loginHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data);
        if (data._tokenResponse.registered === true)
          this.setState({ message: "Login successful", type: 1 }, () => {
            event.target.email.value = "";
            event.target.password.value = "";
          });
        else {
          this.setState({ message: "User not verified!", type: 0 });
        }
      })
      .catch((error) => {
        this.setState({ message: error.message, type: 0 });
      });
  };
  googleLoginHandler = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((data) => {
        if (data._tokenResponse.isNewUser === true)
          this.setState({
            message: `"Login successful ${data._tokenResponse.fullName}"`,
            type: 1,
          });
        else {
          this.setState({
            message: "Already Login with this Google Account!",
            type: 0,
          });
        }
      })
      .catch((error) => {
        this.setState({ message: error.message, type: 0 });
      });
  };
  render() {
    return (
      <div>
        {this.state.page ? (
          <Register
            google={this.googleLoginHandler}
            type={this.state.type}
            switch={this.pageSwitchHandler}
            message={this.state.message}
            register={this.registrationHandler}
          />
        ) : (
          <Login
            type={this.state.type}
            google={this.googleLoginHandler}
            login={this.loginHandler}
            message={this.state.message}
            switch={this.pageSwitchHandler}
          />
        )}
      </div>
    );
  }
}

export default App;
