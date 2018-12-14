import React, {Component} from 'react';
import {Link,  withRouter} from 'react-router-dom';
import axios from 'axios';
import ValidationError from './ValidationError';

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
        title: "",
        time: "",
        user: "",
        description: "",
        materials: "",
        id: "",
        redirect: false,
        newId: "",
        validationError: false,
        error: ""
    };
}


// adds functionality for typing in input/text fields
onTitleChange = e => {
  this.setState({ title: e.target.value});
}

onTimeChange = e => {
  this.setState({ time: e.target.value});
}

onDescriptionChange = e => {
  this.setState({ description: e.target.value});
}

onMaterialsChange = e => {
  this.setState({ materials: e.target.value});
}


// Creates a course using currently authenticated user as the user
// if 400 validation error, changes validationError to true, and sets error to the error inforamtion which gets passed to the Validation component
// if other error, routes to /error
createCourse = (cTitle, cDescription, cTime, cMaterials) => {
  let createTitle = cTitle;
  let createDescription = cDescription;
  let createTime = cTime;
  let createMaterials = cMaterials;
  let config = {
    auth: {
      username: this.props.user.emailAddress,
      password: this.props.user.password
    }
  };
  axios.post('/api/courses', {
    title: createTitle,
    description: createDescription,
    estimatedTime: createTime,
    materialsNeeded: createMaterials
  },
  config)
  .then(response => {
    this.props.history.push(`/courses/${response.data.id}`);

  })
  .catch(error => {
    if (error.response.status === 400){
      this.setState({
        validationError: true,
        error: error.response.data.error.errors
      });
    } else {
      this.props.history.push('/error');
    }
  });
}

handleSubmit = e => {
  e.preventDefault();
  this.createCourse(this.state.title,this.state.description,this.state.time,this.state.materials);
  
}


    render() {

      //if there is a validation error, sets variable to the ValidationError component which is passed the error information.  
      // ValidationError componenet determines which messages to display
      let validation;
      if (this.state.validationError) {
        validation = <ValidationError error={this.state.error}/>
      } else {
        validation = "";
      }

      return (
          <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            {validation}
           
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input 
                  id="title" 
                  name="title" 
                  type="text" 
                  className="input-title course--title--input" 
                  placeholder="Course title..."
                  value={this.state.title}
                  onChange={this.onTitleChange} /></div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div><textarea 
                  id="description"                     
                  name="description" 
                  className="" 
                  placeholder="Course description..."
                  value={this.state.description}
                  onChange={this.onDescriptionChange} ></textarea></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      className="course--time--input"
                      placeholder="Hours" 
                      value={this.state.time}
                      onChange={this.onTimeChange} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      className="" 
                      placeholder="List materials..."
                      value={this.state.materials}
                      onChange={this.onMaterialsChange} ></textarea></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
          </div>
        </div>
      );
    }
}

export default withRouter(CreateCourse);
