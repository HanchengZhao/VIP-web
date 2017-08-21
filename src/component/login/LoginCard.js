import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiButton from '../MuiButton';

const style = {card : {margin:"20"},
actions: {marginLeft  : 'auto', marginRight : '1', marginBottom:"30", width:"110"}}


class LoginCard extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Card style = {style.card}> 
              <CardTitle title={this.props.login + " Login"} />
              <Divider />
              <CardText>
                {this.props.discription}
              </CardText>
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginCard;