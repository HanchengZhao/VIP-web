import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import * as firebase from 'firebase';
import update from 'react-addons-update';

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

    }



  componentDidMount() {
    let Rows = [];
    var RowID = [];
    var that = this;

    const studentRef = firebase.database().ref().child('studentpage').child('students');
    studentRef.orderByKey().limitToFirst(1).on('child_added', function(snap) {
           var length = Object.keys(snap.val()).length;
           let Columns = [];
           for (var i = 0; i < length;i++){
               var columnName = Object.keys(snap.val())[i];
               var Column = {key: columnName, name: columnName, editable:true};
               Columns.push(Column);
           }
           that._columns = Columns;

           // first item, in format {"<KEY>": "<VALUE>"}

    });
    studentRef.on("child_added", function(snapshot) {
      var ROW = snapshot.val();
      var uuid = snapshot.key;
      Rows.push(ROW);
      RowID.push(uuid);
      that.setState({
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
    var uuid = this.state.rowIDs[fromRow];

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
      var studentRef = firebase.database().ref().child('studentpage').child('students').child(uuid);
      studentRef.set(rows[i]);
      console.log(rows[i]);

    }

    this.setState({ rows });
  }

  render() {
    return  (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated} />);
  }


}

export default EditableGridComponent;
