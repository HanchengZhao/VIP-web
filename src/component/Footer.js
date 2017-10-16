import React, { Component } from 'react';
import Small_logo from '../assets/small_logo.png';
import '../style/Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className = 'footer'>
          <img src = {Small_logo} alt = "ASU footer" className = "image-footer" />
      </div>
    );
  }
}

export default Footer;