import React from 'react'
import CustomTable from '../CustomTable/CustomTable'
import DateUtil from '../../util/DateUtil'
import { Link } from 'react-router-dom'
import ApiAgents from '../../api/ApiAgents';
import BaseComponent from '../Base/BaseComponent';

class AgentList extends BaseComponent {
    title = "AGENTS"
    emptyMsg = "No data"

    state = {
        data: [],
        errorMsg: ''
    }


    onCallSuccess = (data) => {
        this.setState({ data: data })
    }

    onCallError = (data) => {
        this.setState({ errorMsg: data})
    }

    componentDidMount() {
        ApiAgents.getAgentList(this.onCallSuccess, this.onCallError)
    }

    render() {
        const header = (
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Federal Id</th>
                <th>Birth Date</th>
                <th>Mothers Name</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>Created Date</th>
            </tr>
        )

        var data = this.state.data.map(item => {
            return <tr key={item.id}>
            
                <td><Link to={"/agents/" + item.id}>{item.id} </Link></td>
                <td>{item.user.firstName}</td>
                <td>{item.user.lastName}</td>
                <td>{item.user.email}</td>
                <td>{item.user.ddd}-{item.user.mobilePhone}</td>
                <td>{item.user.gender}</td>
                <td>{item.user.federalId}</td>
                <td>{DateUtil.getDateFromLong(item.user.birthDate)}</td>
                <td>{item.user.mothersName}</td>
                <td>{item.user.address1}</td>
                <td>{item.user.address2}</td>
                <td>{DateUtil.getDateFromLong(item.user.createdDate)}</td>
            </tr>
        })

        data = <tbody>{data}</tbody>

        return  <CustomTable title={this.title} header={header} body={data} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true} />
    }
}

export default AgentList

