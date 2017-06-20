import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as firebase from 'firebase';


class InstructionComponent extends Component{
  constructor(props) {
      super(props);
      this.state = {
            title: '',
            text:''
      };
    }
    componentDidMount(){
        const rootRef = firebase.database().ref().child('studentpage').child('homepage').child('instruction');
        rootRef.on('value',snap=>{
      	  this.setState({
   		  title : snap.val().title,
   		  text : snap.val().text,
   	  });
        });
     }

	render(){
		return (
		    <div>
		      <h1>{this.props.name}</h1>
		        <MuiThemeProvider>
            <Card>
              <CardTitle title={this.state.title} />
              <CardText>
                {this.state.text}
              </CardText>
            </Card>
		        </MuiThemeProvider>
		    </div>
				)
	}
}



export default InstructionComponent;
