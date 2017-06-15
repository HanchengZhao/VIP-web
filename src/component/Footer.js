import React, { Component } from 'react';
import Small_logo from '../assets/small_logo.png';
import styles from '../style/Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className = 'footer'>
          <img src = {Small_logo} className = "image-footer" />
      </div>
    );
  }
}

export default Footer;
