import React from 'react'
import CustomTable from '../CustomTable/CustomTable'
import DateUtil from '../../util/DateUtil'
import { Link } from 'react-router-dom'
import ApiClients from '../../api/ApiClients';
import BaseComponent from '../Base/BaseComponent';

class ClientList extends BaseComponent {
    title = "CLIENTS"
    emptyMsg = "No data"

    state = {
        data: [],
        errorMsg: ''
    }

    onCallSuccess = (data) => {
        this.setState({ data: data })
    }

    onCallError = (data) => {
        this.setState({ errorMsg: data })
    }

    componentDidMount() {
        ApiClients.getClientList(this.onCallSuccess, this.onCallError)
    }

    render() {
        const header = (
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Phone Number</th>
                <th>Created Date</th>
            </tr>
        )

        var body = this.state.data.map(item => {
            return <tr key={item.id}>

                <td><Link to={"/clients/" + item.id}>{item.id} </Link></td>
                <td>{item.user.firstName}</td>
                <td>{item.user.lastName}</td>
                <td>{item.user.email}</td>
                <td>{item.user.ddd}-{item.user.mobilePhone}</td>
                <td>{DateUtil.getDateFromLong(item.user.createdDate)}</td>
            </tr>
        })
        body = <tbody>{body}</tbody>

        return <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true} />
    }
}

export default ClientList