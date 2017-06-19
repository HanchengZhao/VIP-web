import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { Link, Route } from 'react-router-dom';


const style = {
  card: {
    paddingBottom: "10px",
    margin: "10px",
    height: "300px"
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
    height: "150px"
  }
  
}

class ProjectCard extends Component {
    constructor(props) {
      super(props);
      // console.log(this.props.project.title.replace(/ /g,"_"));
      
    }
    render () {
      return (
        <MuiThemeProvider>
          <div className="col-md-4" style={{marginBottom:"10px"}}>
          <Card style={style.card}>
            <CardHeader
              title={this.props.project.title}
              subtitle={this.props.project.subtitle}
              actAsExpander={false}
              showExpandableButton={false}
              titleStyle = {style.cardHeader}
            />
            {/*<CardMedia style={style.cardMedia}>
              <img src={this.props.project.logo} alt="" />
            </CardMedia>*/}
            <CardText expandable={false} style={style.cardText}>
              {this.props.project.description}
            </CardText>
            <Link to={`project/${this.props.project.title.replace(/ /g, "_")}`}>
              <CardActions>
                <FlatButton label="Learn more" />
              </CardActions>
            </Link>
          </Card>
          </div>
        </MuiThemeProvider>
      )
    }
}

export default ProjectCard;