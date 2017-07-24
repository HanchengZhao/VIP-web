import React, { Component } from 'react';

import ReactDataGrid from 'react-data-grid';
import {Toolbar} from 'react-data-grid-addons';

const TableHeader = ['email', 'name', 'team'];

class RosterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster:this.props.roster,
      columns:[
        {
          key:'name',
          name:'Name',
          filterable: true,
          sortable: true
        },
        {
          key:'email',
          name:'Email',
          filterable: true,
          sortable: true
        },
      ],
      rows:'',
      originalRows:'',
      filters:{}
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.createRows = this.createRows.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
  }

  rowGetter = rowNumber => this.state.rows[rowNumber];

  componentDidMount() {
    this.createRows();
  }
  
  onClearFilters() {
    this.setState({filters:{}});
  }

  handleFilterChange(filter) {
    let newFilter = Object.assign({}, this.state.filters);
    if(filter.filterTerm) {
      newFilter[filter.column.key] = filter;
      console.log(newFilter[filter.column.key]);
    }else {
      delete newFilter[filter.column.key];
    }
    this.setState({filter:newFilter});
  }

    handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  }

  createRows() {
    let roster = this.state.roster;
    let keys = Object.keys(this.state.roster);
    let rows = [];
    for (let i = 0; i < keys.length; i++) {
      rows.push({
        email:roster[keys[i]].email,
        name:roster[keys[i]].name
      })
    }
    this.setState({
      rows:rows,
      originalRows:rows
    })
  }

  render() {
    return(
      <ReactDataGrid 
        columns = {this.state.columns}
        enableCellSelect={true}
        toolbar={<Toolbar enableFilter={true}/>}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={800}
        onGridSort={this.handleGridSort}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        canFilter = {true}
      />
    );
  }
}

export default RosterTable;