import React, { Component } from 'react';
import './Bio.css';

class Bio extends Component {

  render() {
    
    return (
      <div className="bio-section">
      <div className="sobre-mim">
        <h6>Sobre mim</h6>
      </div>
        <p className="bio">{this.props.bioText}</p>
      </div>
    );
  }
}

export default Bio;

