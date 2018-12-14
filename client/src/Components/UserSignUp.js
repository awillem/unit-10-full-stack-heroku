import React, {Component} from 'react';
import {
  withRouter
} from 'react-router-dom';
import {Link} from 'react-router-dom';
import ValidationError from "./ValidationError";
import axios from 'axios';

class UserSignUp extends Component {

  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      validationError: "",
      error: ""
    };
  }

  
//adds functionality for text fields
onUserChange = e => {
    this.setState({ user: e.target.value});
}

onPasswordChange = e => {
    this.setState({ password: e.target.value});
}

// if confirm password doesn't match password, adds error indicators and message
onPasswordConfirmChange = e => {
  this.setState({ passwordConfirm: e.target.value});
  if (e.target.value !== this.state.password) {
    e.target.style.border = 'red 1px solid';
    this.setState({
      validationError: true,
      error: 'noMatch'
    });
   
  } else {
    e.target.style.border = '1px solid #ccc4d8';
    this.setState({
      validationError: false,
      error: 'noMatch'
    });
  }
}


onFirstNameChange = e => {
  this.setState({ firstName: e.target.value});
}

onLastNameChange = e => {
  this.setState({ lastName: e.target.value});
}


// post request to sign up user.  
//if validation error, changes validationError flag to true, and pass error information to ValidationError component
// other errors route to /error
signUp = (first, last, email, password) => {
  let fName = first;
  let lName = last;
  let eAddress = email;
  let  pass = password;
  axios.post('/api/users', {
    firstName: fName,
    lastName: lName,
    emailAddress: eAddress,
    password: pass
  })
  .then(response => {
    if (response.status === 201) {
      this.setState({
        validationError: false,
        signUpError: ""
      });
      this.props.signIn(eAddress, pass);
    }
  })
  .then( response => {
    this.props.history.goBack();
  })
  .catch(error => {
    if (error.response.status === 400){
    if (error.response.data.error.name === "ValidationError") {
      this.setState({
        validationError: true,
        error: error.response.data.error.errors
      });
    } else if (error.response.data.message ==="Email already exists") {
      this.setState({
        validationError: true,
        error: 'alreadyExists'
      });
    } else if (error.response.data.message ==="Email not valid") {
      this.setState({
        validationError: true,
        error: 'notValid'
      });
    } else if (error.response.status === 500) {
      this.props.history.push('/error');
    }
  } else {
     this.props.history.push('/error');
  }
  });
}

handleSubmit = e => {
  e.preventDefault();
  if (this.state.password === this.state.passwordConfirm) {
  this.signUp(this.first.value,this.last.value,this.email.value,this.password.value);
  }
}

    render() {
      
      //if validationError, sets ValidationError component and passes error info to it.
      let validation;
      if (this.state.validationError) {
        validation = <ValidationError error={this.state.error}/>
      } else {
        validation = "";
      }

        return (
            <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              {validation}
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div><input 
                          id="firstName" 
                          name="firstName" 
                          type="text" 
                          className="" 
                          placeholder="First Name" 
                          value={this.state.firstName} 
                          onChange={this.onFirstNameChange}
                          ref={(input) => this.first = input} /></div>
                  <div><input 
                          id="lastName" 
                          name="lastName" 
                          type="text" 
                          className="" 
                          placeholder="Last Name" 
                          value={this.state.LastName} 
                          onChange={this.onLastNameChange}
                          ref={(input) => this.last = input} /></div>
                  <div><input 
                          id="emailAddress" 
                          name="emailAddress" 
                          type="text" 
                          className="" 
                          placeholder="Email Address" 
                          value={this.state.User} 
                          onChange={this.onUserChange}
                          ref={(input) => this.email = input} /></div>
                  <div><input 
                          id="password" 
                          name="password" 
                          type="password" 
                          className="" 
                          placeholder="Password" 
                          value={this.state.password} 
                          onChange={this.onPasswordChange}
                          ref={(input) => this.password = input} /></div>
                  <div id="confirmPasswordDiv"><input 
                          id="confirmPassword" 
                          name="confirmPassword" 
                          type="password" 
                          className="" 
                          placeholder="Confirm Password"                      
                          value={this.state.passwordConfirm} 
                          onChange={this.onPasswordConfirmChange} />                          </div>

                  <div className="grid-100 pad-bottom" ><button className="button" type="submit">Sign Up</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <Link to="/userSignIn">Click here</Link> to sign in!</p>
            </div>
          </div>
        );
    }
}

export default withRouter(UserSignUp);
