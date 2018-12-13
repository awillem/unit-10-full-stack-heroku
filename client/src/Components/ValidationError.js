import React from 'react';

const ValidationError = props => {
    let error = props.error;
    // let ul = "";
    let title;
    let description;
    let firstName;
    let lastName;
    let emailAddress;
    let emailAddressInvalid;    
    let emailAddressUsed;
    let password;
    let passwordMismatch
    if (error.title) {
        title = <li>Please provide a value for "Title"</li>;
    }
    if (error.description) {
        description =  <li>Please provide a value for "Description"</li>;
    }
    if (error.firstName) {
        firstName =  <li>Please provide a value for "First Name"</li>;
    }
    if (error.lastName) {
        lastName =  <li>Please provide a value for "Last Name"</li>;
    }
    if (error.emailAddress) {
        emailAddress =  <li>Please provide a value for "Email"</li>;
    }
    if (error === 'notValid') {
        emailAddress =  <li>Please provide a valid value for "Email"</li>;
    }
    if (error === 'alreadyExists') {
        emailAddress =  <li>Email address already in use</li>;
    }
    if (error.password) {
        password =  <li>Please provide a value for "Password"</li>;
    }
    if (error === "noMatch") {
        passwordMismatch =  <li>Passwords do not Match</li>;
        return (
            <div className="validation-errors">
                <ul>                    
                    {passwordMismatch}
                </ul>
              </div>
        );
    }

    return (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                    {title}
                    {description}
                    {firstName}
                    {lastName}
                    {emailAddress}
                    {emailAddressInvalid}
                    {emailAddressUsed}
                    {password}
                    {passwordMismatch}
                  {/* <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li> */}
                </ul>
              </div>
            </div>
    );
}

export default ValidationError;