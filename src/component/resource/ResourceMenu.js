import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import firebase from '../../firebase';
import Primary, { DeleteColor } from '../../Theme';
import userStore from '../../stores/UserStore';
import { observer } from "mobx-react";

const resourceRef = firebase.database().ref('Resource');
const styles = {
  underlineStyle: {
    borderColor: Primary,
  }
}
@observer
class ResourceMenu extends Component {
  constructor(){
    super()
    this.state = {
      facultyResource: ["None"],
      open: false,
      name: "",
      redirectToResource: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendPopup = this.sendPopup.bind(this);
  }

  componentDidMount(){
    resourceRef.child("category").on("value", (snap) => {
      if (snap.val()){
        let categories = snap.val()
        this.setState({
          facultyResource: Object.keys(categories)
        });
      }
      
    })
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleClose = () => {
    this.setState({
      open:false,
    });
  }

  handleSubmit = () => {
    resourceRef.child("category/" + this.state.name).set(true)
    this.setState({
      open: false,
      redirectToResource: true
    });
  }

  sendPopup = () => {
    this.setState({
      open:true,
    });
  }


  render() {
    const actions = [
      <FlatButton label="Cancel" onClick = {this.handleClose}/>,
      <FlatButton label="Submit" onClick = {this.handleSubmit}/>
    ];
    let resourceMenu = this.state.facultyResource.map((resource) => 
      <Link to={ '/resource/' + resource } key={resource}><FlatButton  label={resource} className="menuBarButton" fullWidth = {true} /></Link>
    )
    return (
      <div>
        { resourceMenu }
        { userStore.role === "admin" &&
          <FlatButton label="+ Add new page" className="menuBarButton" fullWidth = {true} onClick = {this.sendPopup}/>
        }
        <MuiThemeProvider>
         <Dialog
            title="Please enter a name for new resource page"
            actions={actions}
            open={this.state.open}
          >
            <TextField hintText="Category name" underlineFocusStyle={styles.underlineStyle} onChange = {this.handleChange}/> 
          </Dialog>
        </MuiThemeProvider>
        {this.state.redirectToResource && (
          <Redirect to={"/resource/" + this.state.name}/>
        )}
      </div>
    );
  }
}

export default ResourceMenu;