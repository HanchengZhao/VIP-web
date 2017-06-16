import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const style = {
  card: {
    margin: "10px",
  },
  cardHeader: {
    textAlign : 'left',
    fontSize: '1.2em',
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "150px",
  }
  
}

class ProjectCard extends Component {
    constructor() {
      super();
    }
    render () {
      return (
        <MuiThemeProvider>
          <div className="col-md-4">
          <Card style={style.card}>
            <CardHeader
              title={this.props.project.title}
              subtitle={this.props.project.subtitle}
              actAsExpander={false}
              showExpandableButton={false}
              titleStyle = {style.cardHeader}
            />
            <CardText expandable={false} style={style.cardText}>
              {this.props.project.description}
            </CardText>
             <CardActions>
              <FlatButton label="Learn more" />
            </CardActions>
          </Card>
          </div>
        </MuiThemeProvider>
      )
    }
}

export default ProjectCard;