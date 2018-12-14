import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ValidationError from './ValidationError';

class UpdateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            time: "",
            user: "",
            description: "",
            materials: "",
            id: ""
        };
    }

    //loads course information.  If the returned course user doesn't match authenticated user, routes to /forbidden
    //if course is not found, routes to /not found, otherwise to /error
    componentDidMount() {
        axios.get(`/api/courses/${this.props.match.params.id}`)
          .then(response => {
            this.setState({
                id: response.data._id,
                title: response.data.title,
                user: `${response.data.user.firstName} ${response.data.user.lastName}`,
                description: response.data.description,
                time: response.data.estimatedTime,
                materials: response.data.materialsNeeded
            });  
            if(response.data.user._id !== this.props.user._id) {
                this.props.history.push('/forbidden');
            }
        })
        .catch(error => {
            if(error.response.status === 404) {
                this.props.history.push('/notfound');
            } else {
                this.props.history.push('/error');
            }
        });
    }


    //Adds functionality to use input/text fields
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

    // put request to update course based on input/text fields.  Only allowed if auth user is course owner
    // Validation errors set validationError to true and error to the error response, which is passed to ValidationError component
    //other errors route to /error
    updateCourse = (uTitle, uDescription, uTime, uMaterials, id) => {
        let updateTitle = uTitle;
        let updateDescription = uDescription;
        let updateTime = uTime;
        let updateMaterials = uMaterials;
        let updateId = id;
        let url = `/api/courses/${updateId}`;
        let config = {
          auth: {
            username: this.props.user.emailAddress,
            password: this.props.user.password
          }
        };
        axios.put(url, {
          title: updateTitle,
          description: updateDescription,
          estimatedTime: updateTime,
          materialsNeeded: updateMaterials
        },
        config)
        .then(response => {
            
        // this.props.history.goBack();
        this.props.history.push(`/courses/${this.state.id}`);
        })
        .catch(error => {
            if (error.response.status === 400) {
                this.setState({
                validationError: true,
                error: error.response.data.error.errors
                });
            } else {
                this.props.history.push('/error');
            }
          });  
      }

    
      // prevents default on submit and calls updateCourse
    handleSubmit = e => {
        e.preventDefault();
        this.updateCourse(this.state.title,this.state.description,this.state.time,this.state.materials, this.state.id);

      }

    render() {
       
        //if validationError, sets ValidationError and passes error information
        let validation;
        if (this.state.validationError) {
          validation = <ValidationError error={this.state.error}/>
        } else {
          validation = "";
        }

        return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
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
                    onChange={this.onTitleChange}/>
                    </div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea 
                    id="description" 
                    name="description" 
                    className="" 
                    placeholder="Course description..."
                    value={this.state.description}
                    onChange={this.onDescriptionChange}>
                    
</textarea></div>
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
                        onChange={this.onTimeChange}/>
                        </div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        className="" 
                        placeholder="List materials..."
                        value={this.state.materials}
                        onChange={this.onMaterialsChange}>
                        
    </textarea></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
            </div>
        </div>
        );
    }
}

export default UpdateCourse;
