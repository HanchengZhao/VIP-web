import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { Link } from 'react-router-dom';


const style = {
  card: {
    paddingBottom: "20px",
    margin: "10px",
    height: "50px",
  },
  cardMedia:{
    height: "100px"
  },
  cardHeader: {
    textAlign : 'left',
    fontSize: '0.8em',
    maxHeight: "20px"
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "30px"
  }
  
}

class AnnouncementCard extends Component {
    constructor(props) {
      super(props);

    }
    render () {
      return (
        /*className="col-md-6" */
        <MuiThemeProvider>
          <div  style={{marginBottom:"10px"}}>
          <Card >
            <Link to={`announcement/${this.props.fbkey}`}>
              <CardHeader
                title={<h4>{this.props.announcement.title}</h4>}
                subtitle={new Date(this.props.announcement.startDate).toDateString()}
                actAsExpander={false}
                showExpandableButton={false}
                titleStyle = {style.cardHeader}
              />
            </Link>
            <CardText expandable={false} style={style.cardText}>
              <ReactMarkdown source={this.props.announcement.content} />
            </CardText>
            <Link to={`announcement/${this.props.fbkey}`}>
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
  
AnnouncementCard.propTypes = {
  announcement : PropTypes.shape({
    content : PropTypes.string,
    date: PropTypes.number
  })
}

export default AnnouncementCard;