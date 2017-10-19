import React, { Component } from 'react';

import csv from 'csvtojson';
import FileInput from 'react-file-input';
import firebase from '../firebase';
import fs from 'fs';

import MenuItem from 'material-ui/MenuItem';
import request from 'request';
import SelectField from 'material-ui/SelectField';

class CsvUpload extends Component {

  constructor() {
    super();
    this.state = {
      team:'default',
      teams:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.uploaded = this.uploaded.bind(this);
    this.convertToJson = this.convertToJson.bind(this);
  }

  componentDidMount() {
    let teams = [];
    firebase.database().ref('Teams/').on('value', (snap)=>{
      Object.keys(snap.val()).forEach((team)=>{
        teams.push(snap.val()[team].teamName);
      });
      this.setState({
        teams:teams
      });
    });

    firebase.database().ref('Semester').on('value', (snap)=>{
      this.setState({
        semester:snap.val().current
      });
    });
  }

  uploaded(event) {
    let team = this.state.team;
    let semester = this.state.semester;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsText(file);
    reader.onload = function () {
      csv().fromString(reader.result).on('json', (jsonObj)=>{
        jsonObj['name'] = jsonObj["First Name"] + jsonObj["Last Name"];
        jsonObj['email'] = jsonObj["ASURITE"] + "asu.edu";
        jsonObj['teamName'] = team;
        // firebase.database().ref(`Students/${team}/${semester}`).push(jsonObj);
        // firebase.database().ref('Users').push({
        //   email:jsonObj.email,
        //   role:'student'
        // });
      });
    };
  }

  convertToJson(url) {
    console.log(url);
    csv().fromStream(url).on('csv', (csvRow)=>{
      console.log(csvRow);
    });
  }

  handleChange(event, index, value) {
    this.setState({
      team:value
    });
    if(!(value === 'default')) {
      this.inputElement.click();
    }
  }

  render(){
    let teams = this.state.teams.map((team)=>{
      return <MenuItem value={team} primaryText={team} />;
    })
    return(
      <div>
        <FileInput accept=".csv" name = "CsvUpload" onChange={this.uploaded} ref={input => this.inputElement = input}/>
        <SelectField onChange = {this.handleChange} value = {this.state.team} style = {{float:'right'}}>
          {teams}
          <MenuItem value={"default"} primaryText={"Upload Teams Roster"} />
        </SelectField>
      </div>
    );
  }
}

export default CsvUpload;