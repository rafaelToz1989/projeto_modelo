import React from 'react'
import { TabPane, TabContent, Media, Button, Nav, NavItem, NavLink } from 'reactstrap'
import CustomTable from '../../CustomTable/CustomTable';
import './Agent.css'
import AgentSummary from './AgentSummary';
import classnames from 'classnames';
import ApiAgents from '../../../api/ApiAgents';
import BaseComponent from '../../Base/BaseComponent';

class Agent extends BaseComponent {
    

    constructor(props) {
        super(props);
    
        this.title = "AGENT"
        this.state = {
            agent: null,
            cards: null,
            errorMsg: '',
            activeTab: '1'
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    onGetAgentSuccess = (data) => {
        this.setState({ agent: data })
    }

    onGetAgentError = (data) => {
        this.setState({ errorMsg: data })
    }

    onGetAgentCardsSuccess = (data) => {
        this.setState({ cards: data })
    }

    onGetAgentCardsError = (data) => {
        // this.setState({ errorMsg: data})
    }

    componentDidMount() {
        ApiAgents.getAgent(this.props.match.params.id, this.onGetAgentSuccess, this.onGetAgentError)
        ApiAgents.getAgentCards(this.props.match.params.id, null, this.onGetAgentCardsSuccess, this.onGetAgentCardsError)
    }

    render() {
        if (this.state.agent != null) {
            const agent = this.state.agent
            const body =
                <tbody>
                    <tr>
                        <td className="labelDetail">Federal ID</td>
                        <td>{agent.user.federalId}</td>
                    </tr>
                    <tr>
                        <td className="labelDetail">E-mail</td>
                        <td>{agent.user.email}</td>
                    </tr>
                    <tr>
                        <td className="labelDetail">Mobile Phone</td>
                        <td>{agent.user.ddd + "-" + agent.user.mobilePhone}</td>
                    </tr>
                </tbody>

            const cardsHeader = <tr>
                <th>Pan</th>
                <th>Proxy</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Partner</th>
                <th></th>
            </tr>

            var cardsBody = null;
            if (this.state.cards != null) {
                cardsBody = this.state.cards.map(item => {
                    return <tr key={item.proxy}>
                        <td>{item.pan}</td>
                        <td>{item.proxy}</td>
                        <td>{item.type}</td>
                        <td>{item.balance}</td>
                        <td>{item.status}</td>
                        <td>{item.partner}</td>
                        <td><Button bsStyle="success" bsSize="xsmall">Charge</Button>&nbsp;<Button bsStyle="danger" bsSize="xsmall">Block/Unblock</Button></td>
                    </tr>

                })
                cardsBody = <tbody> {cardsBody} </tbody>
            }
            return (
            <div>
                <h1> Agent <small>Detail</small></h1>
                <AgentSummary agent={agent} />
                <br/>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1') }} >
                        Details
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2') }}>
                        Documents
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3') }}>
                        Cards
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4') }}>
                        Pushs
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '5' })}
                        onClick={() => { this.toggle('5') }}>
                        Requests
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '6' })}
                        onClick={() => { this.toggle('6') }}>
                        Ratings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '7' })}
                        onClick={() => { this.toggle('7') }}>
                        CardCharges
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent  id="tabs" activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <CustomTable body={body} />
                    </TabPane>
                    <TabPane tabId="2">
                        <Media object src="http://www.guiaserrasede.com.br/files/guia/21/cnh-a-b.png"  />
                        <Media object src="http://www.guiaserrasede.com.br/files/guia/21/cnh-a-b.png" />
                    </TabPane>
                    <TabPane tabId="3">
                        <CustomTable header={cardsHeader} body={cardsBody} emptyMsg="Sem cartões" loading={true} />
                    </TabPane>
                    <TabPane  tabId="4">
                        Pushs
                    </TabPane>
                    <TabPane tabId="5">
                        Requests
                    </TabPane>
                    <TabPane  tabId="6">
                    Ratings
                    </TabPane>
                    <TabPane  tabId="7">
                    CardCharges
                    </TabPane>
                </TabContent>


            </div>
            )
        } else {
            return null
        }
    }



}

export default Agent