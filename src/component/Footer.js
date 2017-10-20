import React, { Component } from 'react';
import '../style/Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className="container">
        <div className="footer">
          <div id="innovation-footer">
            <div id="innovation-bar">
              <div className="innovation-top">
                <div className="innovation-status">
                  <a href="https://yourfuture.asu.edu/rankings"><span>ASU is #1 in the U.S. for Innovation</span></a>
                </div>
                <div className="innovation-hidden">
                  <a href="https://yourfuture.asu.edu/rankings"><img src="//www.asu.edu/asuthemes/4.6/assets/best-college-2017.png" alt="Best Colleges U.S. News Most Innovative 2017"/></a>
                </div>
              </div>
            </div>
            <div className="footer-menu">
              <ul className="default">
                <li className="links-footer"><a href="http://www.asu.edu/copyright/">Copyright &amp; Trademark</a></li>
                <li className="links-footer"><a href="http://www.asu.edu/accessibility/">Accessibility</a></li>
                <li className="links-footer"><a href="http://www.asu.edu/privacy/">Privacy</a></li>
                <li className="links-footer"><a href="http://www.asu.edu/asujobs">Jobs</a></li>
                <li className="links-footer"><a href="http://www.asu.edu/emergency/">Emergency</a></li>
                <li className="no-border links-footer"><a href="http://www.asu.edu/contactasu/">Contact ASU</a></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Footer;