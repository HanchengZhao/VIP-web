import React, { Component } from 'react';
import ProjectCard from './ProjectCard';

import artgineer from '../../assets/team_logo/artgineer.png';
import crypto from '../../assets/team_logo/crypto.png'
import deeplearning from '../../assets/team_logo/deeplearning.jpg';

import firebase from '../../firebase';



class ProjectList extends Component {
    constructor() {
      super();
      this.state = {
        projects : ""
      }
    }

    componentDidMount(){
      const projectRef = firebase.database().ref('projectInfo');
      projectRef.on("value", (snap) => {
        this.setState({
          projects: snap.val()
        });
      })
      console.log(this.state.projects)
  }

    render () {
      // let projectCard = this.state.projects.map((project) => 
      //     <ProjectCard key={project.id} project={project} />
      //   )
      return (
        <div className="row">
          { this.state.projects
            ? (this.state.projects.map((project) => 
                <ProjectCard key={project.id} project={project} />
              ))
            : (<h2>Loading...</h2>)
          }
        </div>
      )
    }
}

export default ProjectList;