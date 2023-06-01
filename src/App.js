import React, { Component } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail,
signInWithPopup, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSqNCgSK7mtkPYoDA2CaDfz8ubO97CjSU",
  authDomain: "fir-project-9e7eb.firebaseapp.com",
  databaseURL: "https://fir-project-9e7eb-default-rtdb.firebaseio.com",
  projectId: "fir-project-9e7eb",
  storageBucket: "fir-project-9e7eb.appspot.com",
  messagingSenderId: "1010234250070",
  appId: "1:1010234250070:web:c926dd0a2b6ae2330e3cf7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       page: 1,
       message:"",
       type: 1,
    };
  };
  pageSwitchHandler = (event) =>{
    this.setState({page: !this.state.page, message: null});
    event.preventDefault();
  };
  registrationHandler =(event)=>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if(password !== confirmPassword){
      this.setState({message: "Passwords do not match!", type:0})
      return;
    };
    createUserWithEmailAndPassword(auth, email, password)
  .then((data) => {
    sendSignInLinkToEmail(auth, email)
    this.setState({message: "Registered succesfully!", type:1}, ()=>{
      event.target.email.value="";
      event.target.password.value="";
      event.target.confirmPassword.value="";
    });
  })
  .catch((error) => {
    this.setState({message: error.message, type:0});
  });
  };
  loginHandler =(event)=>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
  .then((data) => {
    // console.log(data);
    if (data.user.emailVerified === true) 
    this.setState({message:"Login successful", type:1}, ()=>{
      event.target.email.value="";
      event.target.password.value="";
    })
    else {this.setState({message:"User not verified!", type:0})}
  })
  .catch((error) => {
    this.setState({message: error.message, type:0});
  });
  }
  googleLoginHandler = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  });
  }
  render() {
    return (
      <div>
        {this.state.page? (<Register 
        google={this.googleLoginHandler}
        type={this.state.type}
        switch={this.pageSwitchHandler}
        message={this.state.message}
        register={this.registrationHandler}/>): 
        (<Login type={this.state.type}
        login={this.loginHandler}
        message={this.state.message}
        switch={this.pageSwitchHandler}/>)}
      </div>
    )
  }
}

export default App
