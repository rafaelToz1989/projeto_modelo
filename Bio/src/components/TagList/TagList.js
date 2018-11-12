import React, { Component } from 'react';
import './TagList.css';


class TagList extends Component {

  render() {
    
    var tags = '';

    if (this.props.tags != null) {
        tags =  this.props.tags.map(function (tag) {
            var tagName =  <h5 className="skill-tag">{tag}</h5>

            return <div>{tagName}</div>
        });
    }else{
            
    }

    return (
      <div className="App">
       {tags}
      </div>
    );
  }
}

export default TagList;