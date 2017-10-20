import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import Dropzone from 'react-dropzone';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiButton from '../MuiButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Primary, { Secondary, DeleteColor } from '../../Theme';

import firebase from '../../firebase';
import userStore from '../../stores/UserStore';

const styles = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  dropZone: {
    position: "col-md-3"
  },
  publishButton: {
    marginTop: "20px"
  }
};

const resourcePath = "Resource"

class ResourcePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      category: this.props.match.params.category,
			dialogOpen: false,
			deleteOpen: false,
			editting: false,
			redirectToDashboard: false
    }

    this.contentChange = this.contentChange.bind(this);
    this.publish = this.publish.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    this.handleTab = this.handleTab.bind(this);
		this.onDrop = this.onDrop.bind(this);
    this.sendPopup = this.sendPopup.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }


  contentChange(e) {
    this.setState({
      content: e.target.value
    })

  }

  publish(){
    let Resource = {
      content: this.state.content,
    }
    let resourceRef = firebase.database().ref().child(resourcePath).child(this.state.category)
    resourceRef.update(Resource)
    this.setState({
      editting: false,
      dialogOpen: true
    })
  }

  handleClose(){
    this.setState({
			dialogOpen:false,
			deleteOpen:false
    });
	}
	
	handleDelete(){
		firebase.database().ref(resourcePath).child(this.state.category).remove();
		firebase.database().ref(resourcePath + '/category/').child(this.state.category).remove();
		this.setState({
      redirectToDashboard: true
    });
	}

	handleEdit(){
		this.setState({
      editting:true
    });
	}

  handleTab(e){
    if (e.keyCode === 9) { // tab was pressed
      console.log(this.refs.input);
      e.preventDefault();
      let val = this.state.content,
          start = e.target.selectionStart,
          end = e.target.selectionEnd;
      this.setState({content: val.substring(0, start) + "\t" + val.substring(end)},
        () => {let contentnode = document.getElementById("content")
      contentnode.selectionStart = contentnode.selectionEnd = start + 1;} );

    }
  }

  onDrop(photos){
    const ref = firebase.storage().ref()
    photos.forEach((photo) => {
      let photoRef = ref.child("Resource/" + this.state.category + "/" + photo.name);
      photoRef.put(photo)
      .then((snap) => {
        this.setState(prevState => ({
          content : prevState.content + `\n\n<img alt="${photo.name}" src="${snap.downloadURL}" width="50%">`
        }))
      })
    })
	}
	
	sendPopup(){
		this.setState({
      deleteOpen:true,
    });
	}

  updateContent(category){
    firebase.database().ref(`${resourcePath}/${category}`).once('value').then( (snap) => {
			if (snap.val()) {
				this.setState({
          content: snap.val().content,
          editting: false
				});
			} else {
				this.setState({
          content: "",
          editting: false
				});
      }
    });
    
  }

  componentDidMount() {
    this.updateContent(this.state.category);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.category !== this.state.category){
			this.setState({
				category: nextProps.match.params.category
      })
      this.updateContent(nextProps.match.params.category);
		}
	}

  render(){
    const updateActions = [
      <FlatButton
        label="Complete"
        primary={true}
        onTouchTap={this.handleClose}
      />
		];
		const deleteActions = [
      <FlatButton  label="Cancel" color={DeleteColor} onClick = {this.handleClose}/>,
      <FlatButton  label="Delete" onClick = {this.handleDelete}/>
    ];
    return (
      <div>
        {this.state.editting &&
        <div>
					<div style={{marginBottom: "10px"}}>
						<MuiThemeProvider>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 style={{coler:Secondary}}>{this.state.category.split("_").join(" ").toUpperCase()}</h4>
								</div>
								<div className="panel-body">
									<TextField
									id="content"
									hintText="You can use markdown syntax here to edit resource content"
									floatingLabelText="**bold** _italics_ # header `code` ```preformatted``` >quote"
									multiLine={true}
									rows={4}
									onChange={this.contentChange}
									onKeyDown={this.handleTab}
									underlineFocusStyle={styles.underlineStyle}
									floatingLabelStyle={styles.floatingLabelStyle}
									fullWidth={true}
									value={this.state.content}
								/>
								</div>
								
							</div>
						</MuiThemeProvider>
						<div className="row">
							<div className={styles.dropZone.position}>
								<Dropzone
									accept="image/jpeg, image/png, image/gif"
									onDrop={this.onDrop}
								>
									{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
										if (isDragActive) {
											return "This file type is valid";
										}
										if (isDragReject) {
											return "This file type is not valid";
										}
										return acceptedFiles.length || rejectedFiles.length
											? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
											: "Upload local images via drop/click.";
									}}
								</Dropzone>
							</div>
						</div>
						<div className="row" style={styles.publishButton}>
							<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
								<RaisedButton className="pull-right" label = "Update"  backgroundColor = {Primary} onClick={this.publish} />
							</MuiThemeProvider>
						</div>
					</div>
					<h4>Preview:</h4>
        </div>
        }
        <div className="panel panel-default">
          <div className="panel-heading"><h4>{this.state.category.split("_").join(" ").toUpperCase()}</h4> </div>
          <div className="panel-body">
            <ReactMarkdown source={this.state.content} renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}/>
          </div>
        </div>
				{ userStore.role === "admin" &&
          <div>
            <div className="row" >
              <div style={{float: "right"}}>
                <MuiButton label = "Delete" color = {DeleteColor} onClick={this.sendPopup}/>
              </div>
              <div style={{float: "right"}}>
                <MuiButton label = "Edit" color = {Primary} onClick={this.handleEdit}/>
              </div>
            </div>
					</div>
				}
        <MuiThemeProvider>
					<div>
						<Dialog
            title="Content change saved!"
            actions={updateActions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
						>
						</Dialog>
						<Dialog 
							title="Sure to delete?"
							actions={deleteActions}
							open = {this.state.deleteOpen}
						/>
					</div>
        </MuiThemeProvider>
				{this.state.redirectToDashboard && (
          <Redirect to={"/" + userStore.role}/>
        )}
      </div>
    )
  }
}

export default ResourcePage;
