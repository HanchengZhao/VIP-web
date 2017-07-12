import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiButton from "./MuiButton";
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
      data : this.props.data,
    }
    this.selected = [];
    this.addElement = this.addElement.bind(this);
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
    console.log(this.selected);
  }

  render = () => {
    let Header = () => {
      let uuid = Object.keys(this.state.data)[0];
      let HeaderKeys = Object.keys(this.state.data[uuid]).map((keys) => (
        <TableRowColumn>{keys}</TableRowColumn>
      ));
      return <TableRow>{HeaderKeys}</TableRow>;
    };
    
    let Body = Object.keys(this.props.data).map((uuid) => {
      let BodyItem = Object.keys(this.state.data[uuid]).map((item) => (
        <TableRowColumn>{this.state.data[uuid][item]}</TableRowColumn>
      ));
      return <TableRow>{BodyItem}</TableRow>;
    });

    return(
      <div>
        <MuiThemeProvider>
         <Table multiSelectable = {true} onRowSelection = {this.addElement}> 
           <TableHeader>
              {Header()}
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
              {Body}  
          </TableBody>
        </Table>
        </MuiThemeProvider>
        <div style = {{display :this.props.display || "none"}}>
          <MuiButton label = "click" />
        </div>   
      </div>
    );
  }
}

export default MuiTable;