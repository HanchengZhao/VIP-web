import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import MuiButton from '../../MuiButton';
import firebase from '../../../firebase';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class NewStudentApplicationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster:this.props.roster,
      columns:[],
    rows:'',
    sortColumn: null,
    sortDirection: null,
    filters:{},
    selectedIndexes :[] 
    }
    this.getRows = this.getRows.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getSize = this.getSize.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.createColumns();
    this.createRows();
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
  
  handleAccept() {
    let keys = Object.keys(this.state.roster);
    this.state.selectedIndexes.forEach((i) => {
      // firebase.database().ref('AcceptedStudents_Raw_Data').push(this.state.rows[i]);
      this.handleRemove(keys[i]);
    });
  }

  handleRemove(uuid) {
    firebase.database().ref(`StudentApplication`).child(uuid).remove();
    let temp = this.state.rows;
    console.log(temp);
    // delete temp[uuid];
    this.setState({
      rows:''
    },this.createRows());
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

  render() {
    return  (
      <div>
        <ReactDataGrid
          rowKey="id"
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={800}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} 
          rowSelection={{
            showCheckbox: true,
            
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}/>
        <MuiButton label = "Accept" onClick = {this.handleAccept} />
        <p style={{float:'right',color:"#d6dedb"}}>(Number of Records {this.getSize()})</p>
      </div>);
  }
};

export default NewStudentApplicationTable;