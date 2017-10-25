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
import Primary, { Secondary, DeleteColor} from '../../Theme';
//Style sheet
import '../../style/projectpage.css';
import {Link} from 'react-router-dom';  
//Firebase init
import firebase from "../../firebase";

import VIP from '../../assets/Vip_logo.png';

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
      faculty:'',
      fbkey: this.props.match.params.projectId
    };
    this.handleSunset = this.handleSunset.bind(this);
  }

  componentDidMount() {
    
    firebase.database().ref(`Teams/${this.state.fbkey}`).once('value').then( (snap) => {
      let faculty = {};
      Object.keys(snap.val()).forEach((key)=>{
        if(key.substring(0,4)==="lead"){
          faculty[key] = snap.val()[key].split(",");
        }
      });
      this.setState({
        data:snap.val(),
        faculty:faculty
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
    let faculty;
    let data = Object.keys(this.state.data).reverse().map((key) => {
      if(this.state.data[key]==='' || key === 'logo' || key === 'teamName' || key === 'subtitle' || key.substring(0, 4)==="lead"){
        return;
      }
      return(
        <div key={key}>
          <h2 style = {{color:Primary, marginBottom:'50px', marginTop:'50px'}}><strong>{key.charAt(0).toUpperCase() + key.slice(1).split(/(?=[A-Z])/).join(" ")}</strong></h2>
          <h4>{this.state.data[key]}</h4>
        </div>
      );
    });
    if(this.state.faculty){
      faculty = this.state.faculty["leadFacultyName"].map((key)=>{
        let index = this.state.faculty["leadFacultyName"].indexOf(key);
        return(<h4>{this.state.faculty['leadFacultyName'][index]}, {this.state.faculty['leadFacultyDegree'][index]}, {this.state.faculty['leadFacultyAcademicTitle'][index]}, {this.state.faculty['leadFacultyAcademicUnit'][index]}, {this.state.faculty['leadFacultyEmail'][index]}</h4>)
    });
    }


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
                <h1 className = "title" style = {{color:Secondary}}><strong>{this.state.data.title || this.state.data.teamName}</strong></h1>
                <h2 className = "title" style = {{color:Secondary}}><strong>{this.state.data.subtitle}</strong></h2>
                <img src = {this.state.data.logo || VIP} style = {{maxWidth:'500px', float:'right'}}/>
                {data}
                <h2 style = {{color:Primary, marginBottom:'50px', marginTop:'50px'}}><strong>Faculty</strong></h2>
                {faculty}
                {(userStore.authed === true) &&
                  <div className="row">
                  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div>
                    <Link to={`${this.state.fbkey}/apply`}>
                      <RaisedButton label = "apply" id = "applyButton" backgroundColor = {Primary} style = {{float: "right", margin:"10px"}}/>
                    </Link>
                    </div>
                  </MuiThemeProvider>
                  </div>
                }
                {(userStore.role === "admin")
                    ?<MuiButton label = "Sunset Team" color = {DeleteColor} style = {{margin:"10px"}} onClick = {this.handleSunset}/>
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