import React, { Component } from 'react';

class LogoComponent extends Component {
  constructor(props){
    super(props);
  }
  // componentDidMount(){
  //   console.log(this.props);
  // }
  render() {
    return (
      <div>
        <p>test for logo</p>
        <img src={this.props.dataUrl} alt=""/>
      </div>
    );
  }
}

export default LogoComponent;
