import React, { Component } from 'react';

import AnnouncementCard from './AnnouncementCard';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import firebase from '../../firebase';
import userStore from '../../stores/UserStore';



class AnnouncementList extends Component {
  constructor(){
    super();
    this.state = {
      anmts: ""
    }
  }

  componentDidMount(){
    const anmtRef = firebase.database().ref('Announcement/admin');
    anmtRef.once("value", (snap) => {
      this.setState({
        anmts: snap.val()
      });
    })
  }


  render(){
    let anmts = this.state.anmts;
    return (
      <div>
        <div>
        <div className="row">
          { this.state.anmts
            ? (Object.keys(this.state.anmts).map((uuid) =>
                <AnnouncementCard key={uuid} fbkey={uuid} announcement={anmts[uuid]} />
              ))
            : (<h2>Loading...</h2>)
          }
        </div>
        {userStore.role === "admin" &&
        <div className="row">
          <Link to={"announcement/creation"}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "Creat an announcement" id = "applyButton" backgroundColor = "#ffc425" style = {{float: "right", margin:"10px"}}/>
            </MuiThemeProvider>
          </Link>
        </div>
        }
      </div>
      </div>
    )
  }
}

export default AnnouncementList;
