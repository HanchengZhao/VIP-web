import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import firebase from './../firebase';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiButton from "./MuiButton";
import Primary, {Secondary} from './../Theme';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MuiTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:'',
      data : this.props.data,
      fbRemove: this.props.removeRef,
      fbApprove: this.props.approveRef,
      fbReject: this.props.fbReject,
      open:false,
    }
    this.selected = [];
    this.addElement = this.addElement.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }


  addElement = (uuid) => {
    const keys = Object.keys(this.state.data);
    let temp = [];
    switch(uuid) {
      case "all":
        temp = keys.slice();
        break;
      case "none":
        break;
      default:
        uuid.forEach((i) =>{
          temp.push(keys[i]);
      });
    }
    this.selected = temp.slice();
  }

  handleAccept = () => {
    let fbRef = firebase.database().ref(this.state.fbApprove);
    let selected = this.selected;

    selected.forEach((i)=> {
      fbRef.push(this.state.data[i]);
      this.handleRemove(i);
    });
    this.selected = [];
  }

  handleChange = (e) => {
    this.setState({
      comments: e.target.value
    });
  }

  handleReject = () => {
    let fbRef = firebase.database().ref().child(this.state.fbReject);
    fbRef.push({
      application: this.props.Application,
      comments:this.state.comments
    });
    this.handleClose();
    this.removeApplication();
  }

  handleOpen = () => {
    this.setState({
      open:true
    })
  }

  handleClose = () => {
    this.setState({
      open:false
    })
  }

  handleRemove = (uuid) => {
    firebase.database().ref(this.state.fbRemove).child(uuid).remove();
  }

  render = () => {
    let Header = () => {
      let uuid = Object.keys(this.state.data)[0];
      let HeaderKeys = Object.keys(this.state.data[uuid]).map((keys) => (
        <TableRowColumn key = {keys}>{keys}</TableRowColumn>
      ));
      return <TableRow key = {HeaderKeys}>{HeaderKeys}</TableRow>;
    };
    
    let Body = Object.keys(this.props.data).map((uuid) => {
      let BodyItem = Object.keys(this.state.data[uuid]).map((item) => (
        <TableRowColumn key = {item}>{this.state.data[uuid][item]}</TableRowColumn>
      ));
      return <TableRow key = {uuid}>{BodyItem}</TableRow>;
    });

    const actions = [
      <FlatButton label="No" onClick = {this.handleClose}/>,
      <FlatButton label="Yes" onClick = {this.handleReject}/>
    ];

    return(
      <div>
        <h1 style={{textAlign:"center"}}>{this.props.name.split("_").join(" ")}</h1>
        <MuiThemeProvider>
          <div>
            <Table multiSelectable = {true} onRowSelection = {this.addElement}> 
              <TableHeader>
                  {Header()}
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                  {Body}  
              </TableBody>
            </Table>
            <Dialog 
              title="Are you sure you want to deny this application?"
              actions={actions}
              open = {this.state.open}
              onRequestClose={this.handleClose}
            >
              <TextField hintText="Comments . . . " fullWidth = {true} onChange = {this.handleChange}/> 
            </Dialog>
          </div>
        </MuiThemeProvider>
        <div style = {{float:"right"}}>
          <MuiButton label = {"Deny" || this.props.rejectWord} color = {Secondary} onClick = {this.handleOpen}/>  
          <MuiButton label = {"Approve"|| this.props.approveWord} onClick = {this.handleAccept}/>
        </div>
        {this.props.button}
      </div>
    );
  }
}

export default MuiTable;