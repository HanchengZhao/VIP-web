import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import json2csv from 'json2csv';
import fileDownload from 'react-file-download';
import FlatButton from 'material-ui/FlatButton';
import firebase from '../../firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CsvUpload from '../CsvUpload';


const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class RosterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster:this.props.roster,
      columns:[],
      rows:'',
      sortColumn: null,
      sortDirection: null,
      filters:{},
      selectedIndexes:[] 
    }
    this.getRows = this.getRows.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getSize = this.getSize.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.exportRoster = this.exportRoster.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
  }

  componentDidMount() {
      this.createColumns();
      this.createRows();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.roster);
    this.setState({
      roster:nextProps.roster
    }, ()=>{
      this.createColumns();
      this.createRows();
    });
  }

  exportRoster() {
    let fields = []
    this.state.columns.forEach((i)=>{
      fields.push(i.key);
    });
    try{
    let result = json2csv({ data: this.state.rows, fields: fields });
    fileDownload(result, `roster.csv`);
    }catch(err) {
      console.log(err);
    }
  }

  createColumns() {
    let keys = Object.keys(this.state.roster);
    let columns = Object.keys(this.state.roster[keys[0]]);
    let temp = [];
    columns.forEach((i) => {
      if(i==='name') {
        temp.unshift({
        key:i,
        name:i.split('_').join(' '),
        filterable:true,
        sortable:true,
        resizable: true,
      });
      }else{
      temp.push({
        key:i,
        name:i.split('_').join(' '),
        filterable:true,
        sortable:true,
        resizable: true,
      })}
    });
    this.setState({
      columns:temp
    });
  }

  createRows() {
    let roster = this.state.roster;
    let keys = Object.keys(this.state.roster);
    let columnKeys = Object.keys(roster[keys[0]]);
    let rows = [];
    for (let i = 0; i < keys.length; i++) {
      let rowObject = {}
      columnKeys.forEach((key) => {
        rowObject[key] = roster[keys[i]][key]
      });
      rows.push(rowObject);
    }
    this.setState({rows:rows});
  }

  getRows() {
    return Selectors.getRows(this.state);
  }

  getSize() {
    return this.getRows().length;
  }

  rowGetter(rowIdx) {
    const rows = this.getRows();
    return rows[rowIdx];
  }

  handleGridSort(sortColumn, sortDirection) {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  }

  handleFilterChange(filter) {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    this.setState({ filters: newFilters });
  }

  onClearFilters() {
    this.setState({ filters: {} });
  }

  onRowsSelected(rows) {
    let temp = this.state.selectedIndexes;
    rows.forEach((i) => {
      temp.push(i.rowIdx);
    });
    this.setState({
      selectedIndexes:temp
    })
  }

  onRowsDeselected(rows) {
    let temp = this.state.selectedIndexes;
    rows.forEach((i) => {
      temp.splice(temp.indexOf(i.rowIdx),1);
    });
    this.setState({
      selectedIndexes:temp
    })
  }

  handleRemoveFb(student) {
    firebase.database().ref(`Student_Remove_Pending/${this.state.roster[student].teamName}/${this.state.roster[student].semester}`).child(student).set(this.state.roster[student]);
  }

  handleRemoveRow() {
    let remove = [];
    this.state.selectedIndexes.forEach((i)=> {
      remove.push(this.state.rows[i]);
    });
    remove.forEach((i)=> {
      this.state.rows.splice(this.state.rows.indexOf(i),1);
    });
    this.setState({
      selectedIndexes:[]
    })
  }

  handleDeny() {
    let keys = Object.keys(this.state.roster);
    this.state.selectedIndexes.forEach((i) => {
      this.handleRemoveFb(keys[i]);
    });
    this.handleRemoveRow();
  }

  render() {
    return  (
      <div style = {{paddingBottom:'20px'}}>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} 
          rowSelection={{
            showCheckbox: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes,
            }
          }}/>
        <p style={{float:'right',color:"#d6dedb"}}>(Number of Records {this.getSize()})</p>
        <MuiThemeProvider>
          
          <div>
            {!this.props.student &&
              <div>
                <FlatButton label = "Download Roster" onClick = {()=>this.exportRoster()}/>
                <FlatButton label = "Delete Selected Student" onClick = {()=>this.handleDeny()}/>
              </div>
            }
            
          </div>
        </MuiThemeProvider>
      </div>);
  }
};

export default RosterTable;