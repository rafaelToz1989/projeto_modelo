import React, { Component } from 'react';
import './Footer.css';
// import FontAwesomeIcon from '../../logo-helpie.png';

class Footer extends Component {

    render() {

        return (

            
          <div className="footer-helper">
            <div className="container">
              <div className="row d-flex">
                <div className="col-auto mr-auto">
                  <p>© 2018</p>
                </div>
                <div className="col-auto">
                  <ul id="social">
                    <li>
                      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/helpieapp/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/helpieapp/">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>    
        );
    }
}

export default Footer;