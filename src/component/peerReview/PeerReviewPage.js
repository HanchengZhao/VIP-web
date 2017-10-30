import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/highlight-off';

import CheckBox from "./questionType/CheckBox";
import Comment from './questionType/Comment';
// import MultipleChoice from './questionType/MultipleChoice';
import Number from './questionType/Number';
import Score from "./questionType/Score";
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import { observer } from "mobx-react";

import PeerReviewStore from '../../stores/PeerReviewStore';
import MuiButton from '../MuiButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import QuestionContainer from './QuestionContainer';
import Primary, {Secondary} from '../../Theme';

import userStore from '../../stores/UserStore';

const style = {
  card: {
    paddingBottom: "10px",
    margin: "10px",
    height: "270px"
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

const data = {
  peerReview: {
    header: 'Form Generation',
    context: 'You can manage your question set here'
  },
  reviewResult: {
    header: 'Peer Review Result',
    context: 'Check all peer review answers'
  }
}

@observer
class PeerReviewPage extends Component {
  constructor () {
    super();
    this.state = {
      
    }
  }

  render() {

    return (
      <div>
        <h2 style={{textAlign:"center", color:Secondary}}>PeerReview</h2>
        <MuiThemeProvider>
          <Paper zDepth = {1} >
          <div style={{margin:'20px'}}>
              An important component of the VIP team experience is peer-evaluation.  
              Students evaluate classmates with whom they work, with one evaluation at midterms and one at the end of each semester.  
              Only instructors can view completed evaluations, and they use them in monitoring student progress.  
              Students can only submit peer evaluations during active evaluation periods.  
              Instructors can access evaluations at any time.
          </div>
          </Paper>
        </MuiThemeProvider>
        {
          (userStore.role === 'admin' || userStore.role === 'advisor') &&
          <div>
            <h4 style={{ color:Primary }}>Tools:</h4>
            <MuiThemeProvider>
              <div>
                <div className="col-md-3" style={{marginBottom:"10px"}}>
                  <Card style={style.card}>
                    <Link to={`peer-review/form_list`}>
                      <CardHeader
                        title={data.peerReview.header}
                        actAsExpander={false}
                        showExpandableButton={false}
                        titleStyle = {style.cardHeader}
                      />
                    </Link>     
                    {/*<CardMedia style={style.cardMedia}>
                      <img src={this.props.project.logo} alt="" />
                    </CardMedia>*/}
                    <CardText expandable={false} style={style.cardText}>
                      {data.peerReview.context}
                    </CardText>
                      <CardActions>
                        <Link to={`peer-review/form_list`}><FlatButton label="Learn more" /></Link>                
                      </CardActions>
                  </Card>
                </div>
                <div className="col-md-3" style={{marginBottom:"10px"}}>
                  <Card style={style.card}>
                    <Link to={`peer-review/review_result`}>
                      <CardHeader
                        title={data.reviewResult.header}
                        actAsExpander={false}
                        showExpandableButton={false}
                        titleStyle = {style.cardHeader}
                      />
                    </Link>
                    {/*<CardMedia style={style.cardMedia}>
                      <img src={this.props.project.logo} alt="" />
                    </CardMedia>*/}
                    <CardText expandable={false} style={style.cardText}>
                      {data.reviewResult.context}
                    </CardText>
                      <CardActions>
                        <Link to={`peer-review/review_result`}><FlatButton label="Learn more" /></Link>                
                      </CardActions>
                  </Card>
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        }
      </div>    
    );
  }
}

export default PeerReviewPage;