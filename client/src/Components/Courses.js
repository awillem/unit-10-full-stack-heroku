import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Course from "./Course";

class Courses extends Component {

    constructor() {
        super();
        this.state = {
          courses: []
        };
    }


    // loads course list.  if error, routes to /error
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(response => {
            this.setState({
              courses: response.data
            });
          })
          .catch(error => {
              console.log("is this it?");
            return window.location.href = "/error";
          });
      }



      
    render() {

        // maps through courses and adds each one to the Course component
        const courses = this.state.courses;
        let courseModules;
        if (courses.length > 0) {
            courseModules = courses.map(course => <Course title={course.title} id={course._id} key={course._id}/>)
        }

        return (
            <div className="bounds">
                {courseModules}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Courses;




