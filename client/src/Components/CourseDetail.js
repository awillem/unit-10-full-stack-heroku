import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import UpdateDelete from './UpdateDelete';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

// loads in the correct course information based on the id.  
// if course is not found, routes to /notfound.  Other errors to /error
    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.id}`)
          .then(response => {
            this.setState({
                id: response.data._id,
                title: response.data.title,
                user: `${response.data.user.firstName} ${response.data.user.lastName}`,
                userId: response.data.user._id,
                description: response.data.description,
                time: response.data.estimatedTime,
                materials: response.data.materialsNeeded
            });
            
          })
          .catch(error => {
              if (error.response.status === 404){
              this.props.history.push('/notfound');
              } else if (error.response.status === 500) {
                this.props.history.push('/error');
              }
          });
      }

    

    render() {
        // if the authenticated user is the course owner, show the update and delete buttons component
        let links;
        let update = `/courses/${this.props.id}/update`;
        if (this.props.user._id === this.state.userId) {
            links = <UpdateDelete update={update} deleteCourse={this.props.deleteCourse} user={this.props.user} id={this.props.id}/>;
        } else {
            links = "";
        }
        
        
        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100" id="links">{links}{/*<span><Link className="button" to="/courses/5bd91bd2bcd7de237857c903/update">Update Course</Link><Link className="button" to="courses/delete">Delete Course</Link></span>*/}
                    <Link className="button button-secondary" to="/">Return to List</Link></div>
                </div>
                </div>
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.title}</h3>
                    <p>By {this.state.user}</p>
                    </div>
                    <div className="course--description">
                    <ReactMarkdown>{this.state.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.time}</h3>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown>{this.state.materials}</ReactMarkdown>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CourseDetail);