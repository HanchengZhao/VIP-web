import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const defaultAnnouncement = {
  header: `## This is header`,
  paragraph: `> This is body`
}


class Announcement extends Component {
  constructor(){
    super();
    this.state = {
      header: defaultAnnouncement.header,
      paragraph: defaultAnnouncement.paragraph
    }
    this.headerChange = this.headerChange.bind(this);
    this.bodyChange = this.bodyChange.bind(this);
  }

  headerChange(e) {
    this.setState({
      header: e.target.value
    })
  }

  bodyChange(e) {
    this.setState({
      paragraph: e.target.value
    })
  }

  render(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {/* header */}
            <TextField
              hintText="Header"
              floatingLabelText="Announcement header"
              floatingLabelFixed={true}
              onChange={this.headerChange}
              style = {{width: 500}}
            />
            <br/>
            {/* body */}
            <TextField
             hintText="Body"
             floatingLabelText="Paragraph"
             multiLine={true}
             rows={4}
             onChange={this.bodyChange}
             style = {{width: 500}}
           />
          </div>
        </MuiThemeProvider>
        <ReactMarkdown source={this.state.header} />
        <ReactMarkdown source={this.state.paragraph} />
      </div>
    )
  }
}

export default Announcement;
