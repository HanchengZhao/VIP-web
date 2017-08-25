import React, { Component } from 'react';
import userStore from '../../stores/UserStore';
//Material UI ELEMENTS
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiButton from '../MuiButton';
import Primary, {DeleteColor} from '../../Theme';
//Style sheet
import '../../style/projectpage.css';
import {Link} from 'react-router-dom';  
//Firebase init
import firebase from "../../firebase";

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data:'',
      image:'',
      subtitle: '',
      topics: [],
      sections: [],
      contactEmail:'',
      open:false,
      fbkey: this.props.match.params.projectId
    };
    this.handleSunset = this.handleSunset.bind(this);
  }

  componentDidMount() {
    
    firebase.database().ref(`Teams/${this.state.fbkey}`).once('value').then( (snap) => {
      // console.log(snap.val());
      this.setState({
        data:snap.val()
      });
    });
  }

  handleSunset() {
    firebase.database().ref(`Teams/`).child(this.state.fbkey).once('value').then((snap) => {
      firebase.database().ref('Project_Sunset').push(snap.val());
    });
    this.setState({open:true});
    firebase.database().ref(`Teams/${this.state.fbkey}`).remove();
  }

  render() {
    let data = Object.keys(this.state.data).map((key) => {
      if(this.state.data[key]==='' || key === 'logo'){
        return;
      }
      return(
        <div>
          <h3>{key.split(/(?=[A-Z])/).join(" ")}</h3>
          <p>{this.state.data[key]}</p>
        </div>
      );
    })

     const actions = [
      <Link to = '/projects'>
      <FlatButton
        label="Close"
        primary={true}
      /></Link>,
    ];
    return (
      <div className = "row">
        <MuiThemeProvider>
          <div>
            <Paper zDepth={2} style = {{margin:'20px'}}>
              {this.state.data &&
              <div style = {{padding:'20px'}}>
                <h1 className = "title">{this.state.data.title || this.state.data.teamName}</h1>
                <h3 className = "title">{this.state.data.subtitle}</h3>
                {this.state.data.logo &&
                  <img src = {this.state.data.logo} style = {{maxWidth:'500px', float:'right'}}/>
                }
                {data}
                {(userStore.authed === true) &&
                  <div className="row">
                  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div>
                    <Link to={`${this.state.fbkey}/apply`}>
                      <RaisedButton label = "apply" id = "applyButton" backgroundColor = {Primary} style = {{float: "right", margin:"10"}}/>
                    </Link>
                    </div>
                  </MuiThemeProvider>
                  </div>
                }
                {(userStore.role === "admin")
                    ?<MuiButton label = "Sunset Team" color = {DeleteColor} style = {{margin:"10"}} onClick = {this.handleSunset}/>
                    :<h1 />
                  }
                  <Dialog
                    title='This Team Has Been Successfully Sunset!'
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                  </Dialog>
              </div>
          }
          </Paper>
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

export default ProjectPage;