import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

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
        {
          key:'major',
          name:'Major',
          filterable: true,
          sortable: true
        },
        {
          key:'team',
          name:'Team',
          filterable: true,
          sortable: true
        },
      ],
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
  }

  componentDidMount() {
    this.createRows();
  }

  createRows() {
    let roster = this.state.roster;
    let keys = Object.keys(this.state.roster);
    let rows = [];
    console.log(this.state.roster);
    for (let i = 0; i < keys.length; i++) {
      rows.push({
        email:roster[keys[i]].email,
        name:roster[keys[i]].name,
        team:roster[keys[i]].team,
        major:roster[keys[i]].Program_and_Plan
      })
    }
    this.setState({
      rows:rows
    })
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
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        enableCellSelect={true}
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.getSize()}
        minHeight={800}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters} />);
  }
};

export default RosterTable;