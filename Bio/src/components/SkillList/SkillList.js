import React, { Component } from 'react';
import './SkillList.css';
import Skill from '../Skill/Skill';

class SkillList extends Component {

  render() {

    return (
      <div className="areas-section">
        <div className="areas-atuacao">
          <h6>Áreas de atuação</h6>
        </div>
      <div className="tags-skills">
        <Skill skillList={this.props.skillList}/>
      </div>
      </div>
    );
  }
}

export default SkillList;
