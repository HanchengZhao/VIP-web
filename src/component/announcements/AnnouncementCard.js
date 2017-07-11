import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ReactMarkdown from 'react-markdown';

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

class AnnouncementCard extends Component {
    constructor(props) {
      super(props);

    }
    render () {
      return (
        <MuiThemeProvider>
          <div className="col-md-6" style={{marginBottom:"10px"}}>
          <Card style={style.card}>
            <CardHeader
              title={this.props.announcement.title}
              subtitle={new Date(this.props.announcement.date).toDateString()}
              actAsExpander={false}
              showExpandableButton={false}
              titleStyle = {style.cardHeader}
            />
            <CardText expandable={false} style={style.cardText}>
              <ReactMarkdown source={this.props.announcement.content} />
            </CardText>
            <Link to={`announcements/${this.props.fbkey}`}>
              <CardActions>
                <FlatButton label="Read more" />
              </CardActions>
            </Link>
          </Card>
          </div>
        </MuiThemeProvider>
      )
    }
}

export default AnnouncementCard;