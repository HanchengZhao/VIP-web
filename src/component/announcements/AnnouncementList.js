import React, { Component } from 'react';
import axios from 'axios';
import AnnouncementCard from './AnnouncementCard';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import Primary from '../../Theme';

import firebase from '../../firebase';
import userStore from '../../stores/UserStore';

const AnnouncementRef = "https://peer-review-25758.firebaseio.com/Announcement/admin.json";

class AnnouncementList extends Component {
  constructor(props){
    super(props);
    this.state = {
      anmts: "",
      pageIndex: 0,
      pageNum: 4,
      uuids: [],
      pageLength: this.props.pageLength || 4,
      previous: "previous disabled",
      next: "next"
    }
    this.anmtRef = firebase.database().ref('Announcement/admin');
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.updateAnnouncement = this.updateAnnouncement.bind(this);
  }

  componentDidMount(){
    axios.get(AnnouncementRef + "?shallow=true") // only fetch uuids
    .then((res) => {
      let uuidArray = Object.keys(res.data);
      this.pageNum = Math.ceil( uuidArray.length / this.state.pageLength );
      this.uuids = uuidArray.sort().reverse(); // reverse chronological order of anmts id
      if ( this.pageNum <= 1 ) {
        this.setState({
          next: "next disabled"
        })
      }
    })
    
    this.anmtRef.orderByKey().limitToLast(this.state.pageLength).once("value", (snap) => {
      this.setState({
        anmts: snap.val()
      });
    })
  }

  handleNext(e){
    e.preventDefault();
    if (this.state.next === "next disabled") {
      return -1 ;
    }
    this.updateAnnouncement(this.state.pageIndex + this.state.pageLength);
    if ((this.state.pageIndex + 2 * this.state.pageLength) >= this.uuids.length ){
      this.setState ({
        next: "next disabled"
      })
    } 
    this.setState((prevState) => ({
      pageIndex: prevState.pageIndex + this.state.pageLength,
      previous: "previous"
    }));
  }

  handlePrevious(e) {
    e.preventDefault();
    if (this.state.previous === "previous disabled") {
      return -1;
    }
    this.updateAnnouncement(this.state.pageIndex - this.state.pageLength);
    if ((this.state.pageIndex - 2 * this.state.pageLength) < 0 ){
      this.setState ({
        previous: "previous disabled"
      })
    }
    this.setState((prevState) => ({
      pageIndex: prevState.pageIndex - this.state.pageLength,
      next: "next"
    }));
  }

  updateAnnouncement(pageIndex){
    this.anmtRef.orderByKey().endAt(this.uuids[pageIndex]).limitToLast(this.state.pageLength).once("value", (snap) => {
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
            ? (Object.keys(this.state.anmts).reverse().map((uuid) =>
                <AnnouncementCard key={uuid} fbkey={uuid} announcement={anmts[uuid]} />
              ))
            : (<h2>Loading...</h2>)
          }
        </div>
        <nav aria-label="...">
          <ul className="pager">
            <li className={this.state.previous}><a href="#" onClick={this.handlePrevious}><span aria-hidden="true">&larr;</span> Newer</a></li>
            <li className={this.state.next}><a href="#" onClick={this.handleNext}>Older <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>
        {userStore.role === "admin" &&
        <div className="row">
          <Link to={"announcement/creation"}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "Create an announcement" id = "applyButton" backgroundColor = {Primary} style = {{float: "right", margin:"10px"}}/>
            </MuiThemeProvider>
          </Link>
        </div>
        }
      </div>
      </div>
    )
  }
}

AnnouncementList.propTypes = {
  pageLength: PropTypes.number
}

export default AnnouncementList;
