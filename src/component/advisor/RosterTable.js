import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
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
      filters:{} 
    }
    this.getRows = this.getRows.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getSize = this.getSize.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createColumns = this.createColumns.bind(this);
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

  render() {
    return  (
      <div>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={800}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} />
        <p style={{float:'right',color:"#d6dedb"}}>(Number of Records {this.getSize()})</p>
      </div>);
  }
};

export default RosterTable;