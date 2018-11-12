import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroupItem} from 'reactstrap';


const MenuItem = (props) => {
    return (
        <Link to={props.url} onClick={props.onClick}>
            <ListGroupItem className={props.customClass} >
                <i className="material-icons md-18" style={{verticalAlign: "middle", lineHeight: "30px", height: "30px"}}>{props.icon} </i> 
                <span style={{verticalAlign: "middle"}}> {props.text}  </span>
            </ListGroupItem>
        </Link>
    )
}

export default MenuItem