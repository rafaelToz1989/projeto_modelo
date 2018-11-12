import React, { Component } from 'react';
import './Skill.css';
import TagList from '../TagList/TagList';


class Skill extends Component {

  render() {

    var html = "";

   

    if (this.props.skillList != null) {
        html =  this.props.skillList.map(function (skill) {
            var skillName =  <h2 className="skill-name">{skill.name}</h2>
            // var price = <p className="skill-name">Valor hora: R$ 35,00 | Diária: R$ 200,00</p>
            var separator = <div className="hr"></div> 
            var tags =  <TagList tags={skill.keywords}/>
            var padding = <div className="skill-padding"></div>
            
            
            // {price}
            return <div className="skills-item">{skillName}{separator}{tags}{padding}</div>
        });
    }

    

    return (
      <div className="skill-list">
        {html}
      </div>
    );
  }
}

export default Skill;