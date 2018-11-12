import React from 'react'
import { Media } from 'reactstrap'
import BaseComponent from '../Base/BaseComponent';

class UserImage extends BaseComponent{

    render(){
        return <div>
            <Media object src={this.props.src}  style={{ width: "100px", height: "100px" }} />
            <div style={{textAlign: "center", paddingBottom: "10px"}}>
            <i className="material-icons md-18">star</i>{this.props.rating}
            </div>
        </div>
    }
}
export default UserImage