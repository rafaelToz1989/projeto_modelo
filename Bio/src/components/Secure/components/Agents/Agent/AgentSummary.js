import React from 'react'
import {Card, CardBody, Badge, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import UserImage from "../../User/UserImage"
import BaseComponent from '../../Base/BaseComponent';

class AgentSummary extends BaseComponent {

    state = {
        
    }


    constructor(props){
        super(props)
        this.state = {
            agent: null,
            dropdownOpen: false
        };
        this.state.agent = props.agent
        this.toggle = this.toggle.bind(this);
        
    }

    componentDidMount(){

    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {
        var agent = this.state.agent
        if(agent != null){
            return (
            <div>
                <Card>
                <CardBody>
                <div style={{ float: "left", width: "100px", marginRight: "10px" }} >
                    <UserImage src="https://www.shareicon.net/data/128x128/2016/07/05/791216_people_512x512.png" rating={4.3} />
                </div>
                <div style  ={{ float: "left" }}>
                    <h3 style={{ marginTop: "0px" }}>{agent.user.firstName + " " + agent.user.lastName} </h3>
                    <div>
                        <Badge color="success">Approved</Badge>
                        &nbsp;<Badge color="success">Active</Badge>
                        &nbsp;<Badge>Android</Badge>
                    </div>
                </div>
                <div style={{ float: "right" }}>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="left"
                        id="actions">
                        <DropdownToggle caret>
                            Actions
                        </DropdownToggle>
                        <DropdownMenu >
                        <DropdownItem header>MANAGE</DropdownItem>
                        <DropdownItem> Approve/Disapprove</DropdownItem>
                        <DropdownItem> Inactivate</DropdownItem>
                        <DropdownItem> Delete</DropdownItem>
                        <DropdownItem> Force Logout</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem header>NOTIFICATION</DropdownItem>
                        <DropdownItem> Send Push</DropdownItem>
                        <DropdownItem> Send SMS</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem header>HELPIE CARD</DropdownItem>
                        <DropdownItem> Generate Credit Card</DropdownItem>
                        <DropdownItem> Manual Charge</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                </CardBody>
                </Card>
            </div>
            )

    
    
        } else {
            return null
        }
    }
}
export default AgentSummary