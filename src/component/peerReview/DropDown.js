import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:0
        };
    }
    componentDidMount(){
      // console.log(this.props.question.options);

      // this.setState({MenuItems: MenuItems})
    }
    handleChange = (event, index, value) => {
        this.setState({value});
    }


    render() {
      let MenuItems = this.props.question.options.map((option, index) =>
          <MenuItem value={index} key={index}  primaryText={option} />
        )
        return (
          <MuiThemeProvider>
            <SelectField
              floatingLabelText="Questions"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {MenuItems}
            </SelectField>
          </MuiThemeProvider>
        )
    }

}

export default DropDown;
