import React, { Component } from 'react';
import update from 'react-addons-update';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import 'bootstrap/dist/css/bootstrap.css';
import ReactDataGrid from 'react-data-grid';
import * as firebase from 'firebase';

const style = {
  margin: 12,
};

class EditableGridComponent extends Component {
  constructor(props) {
      super(props);
      this._columns = [];
      this.state = {
            rows: '',
            RowIDs: ''
      };
      this.rowGetter = this.rowGetter.bind(this);
      this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
      this.handleGridSubmmit = this.handleGridSubmmit.bind(this);

    }



  componentDidMount() {
    let Rows = [];
    var RowID = [];


    const studentRef = firebase.database().ref().child('studentpage').child('students');
    studentRef.orderByKey().limitToFirst(1).on('child_added', (snap) => {
           var length = Object.keys(snap.val()).length;
           let Columns = [];
           for (var i = 0; i < length;i++){
               var columnName = Object.keys(snap.val())[i];
               var Column = {key: columnName, name: columnName, editable:true};
               Columns.push(Column);
           }
           this._columns = Columns;

           // first item, in format {"<KEY>": "<VALUE>"}

    });
    studentRef.on("child_added", (snapshot) => {
      var ROW = snapshot.val();
      var uuid = snapshot.key;
      Rows.push(ROW);
      RowID.push(uuid);
      this.setState({
          rows : Rows,
          rowIDs : RowID
      });

    });



  }

  rowGetter(i) {
    return this.state.rows[i];
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows;

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;



    }

    this.setState({ rows });
  }

  handleGridSubmmit () {
    var Length = this.state.rows.length;
    for (var i = 0; i < Length ; i++){
        var uuid = this.state.rowIDs[i];
        var studentRef = firebase.database().ref().child('studentpage').child('students').child(uuid);
        studentRef.set(this.state.rows[i]);

    }
  }

  render() {
    return  (
      <div>
      <ReactDataGrid
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated} />
      <MuiThemeProvider>
         <div>
           <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleGridSubmmit}/>
         </div>
      </MuiThemeProvider>
      </div>

      );
  }


}

export default EditableGridComponent;
