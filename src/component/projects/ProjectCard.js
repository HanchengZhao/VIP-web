import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { Link, Route } from 'react-router-dom';


const style = {
  card: {
    paddingBottom: "10px",
    margin: "10px",
  },
  cardMedia:{
    height: "100px"
  },
  cardHeader: {
    textAlign : 'left',
    fontSize: '1.2em',
    maxHeight: "100px"
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "140px"
  }
  
}

const color = {
  projectTitle: {
    color: "#8C1D40"
  },
  heading:{
    color: "#FFC627"
  },  
}

class ProjectCard extends Component {
    constructor(props) {
      super(props);
      
    }
    render () {
      return (
        <MuiThemeProvider>
          <div style={{marginBottom:"10px"}}>
          <p style={style.card}>
            <Link to={`projects/${this.props.fbkey}`}>
              <h4 style={color.projectTitle}>{this.props.project.title} </h4>
            </Link>
            <b>{this.props.project.subtitle}</b>
          </p>
          </div>
        </MuiThemeProvider>
      )
    }
}

export default ProjectCard;