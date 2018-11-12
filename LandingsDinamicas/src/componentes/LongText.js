import React, { Component } from 'react';

export default class LongText extends Component {


  render() {


    const MAX_LENGTH = 100;

    const  text  = this.props.value;

    return (
     <div>
      {text.length > MAX_LENGTH ?
        (
          <div>
          {`${text.substring(0, MAX_LENGTH)}...`}
          </div>
        ) :
        <p>{text}</p>
      }
      </div>
    );
  }

}
