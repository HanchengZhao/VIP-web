import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EditProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      teamName: '',
      subtitle: '',
      topics: '',
      advisors: '',
      desc: '',
      major: '',
      requirements: '',
      members: '',
      name: '',
      email: '',
      status: '',
      teamLogo: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let id = e.target.id;
    this.setState({id:e.target.value});
    console.log(this.state.id);
  }

  render() {
    let keys = Object.keys(this.props.project);
    let items = keys.map((key) => {
      if (['sections', 'title', 'logo'].includes(key)){
        return null;
      }
      return(
        <div key = {key}>
          <h3>{key}</h3>
          <TextField id = {key} defaultValue = {this.props.project[key]} multiLine = {true} onChange = {this.handleChange} rows = {2} fullWidth = {true}/> 
        </div>
      );
    })
    console.log(items);
    return(
      <div>
        <MuiThemeProvider>
          <Card expandable = {true}>
            <CardTitle title = {this.props.project.title} subtitle = {this.props.project.subtitle} />
            <CardText expandable = {true}>
              {items}
              <br />
              <div style = {{float:"right"}}>
                <FlatButton label = "cancel" />
                <FlatButton label = "save" />
              </div>
            </CardText>
            <CardActions actAsExpander = {true}>
              <FlatButton label = "edit"/>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default EditProjectCard;