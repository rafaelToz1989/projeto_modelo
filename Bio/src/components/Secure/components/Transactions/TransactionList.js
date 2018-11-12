import React from 'react'
import CustomTable from '../CustomTable/CustomTable'
// import DateUtil from '../../util/DateUtil'
import { Link } from 'react-router-dom'
import NetworkUtil from '../../util/NetworkUtil';
import BaseComponent from '../Base/BaseComponent';

class TransactionList extends BaseComponent {
    title = "TRANSACTIONS"
    emptyMsg = "No data"
    api = {
        method: "get",
        path: "payments",
        body: null
    }
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
        NetworkUtil.doRequest(this.api.method, this.api.path, this.api.body, this.onCallSuccess, this.onCallError)
    }

    render() {
        const header = (
            <tr>
                <th>#</th>
                <th>Price</th>
                <th>PSP</th>
                <th>Status</th>
                <th>Method</th>
            </tr>
        )

        var body = this.state.data.map(item => {
            return <tr key={item.id}>
                <td><Link to={"/payments/payables" + item.id}>{item.id} </Link></td>
                <td>{item.price}</td>
                <td>{item.psp}</td>
                <td>{item.status}</td>
                <td>{item.paymentMethod}</td>
            </tr>
        })
        body = <tbody>{body}</tbody>

        return  <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true}/>
    }
}

export default TransactionList





