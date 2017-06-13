import React, { Component } from 'react';
import Full_logo from '../assets/full_logo.png';
import Small_logo from '../assets/small_logo.png';
import styles from '../style/Header.css';

class Header extends Component {
  constructor() {
      super();
      //console.log(styles.background-color);
  }

  render() {

    return (
      <div className = "header">
        <img src = {Full_logo} className = "image" id = "large"/>
        <img src = {Small_logo} className = "image" id = "small" />
      </div>
    );
  }
}

export default Header;
