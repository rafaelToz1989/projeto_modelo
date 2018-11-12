import React from 'react'
import CustomTable from '../CustomTable/CustomTable'
import DateUtil from '../../util/DateUtil'
import { Link } from 'react-router-dom'
import BaseComponent from '../Base/BaseComponent';
import ApiRequests from '../../api/ApiRequests';

class RequestList extends BaseComponent {
    title = "REQUESTS"
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
        ApiRequests.getRequestList(this.onCallSuccess, this.onCallError)
    }

    render() {
        const header = (
            <tr>
                <th>#</th>
                <th>Expiry Date</th>
                <th>Client Representative</th>
                <th>Forum</th>
                <th>Vara</th>
                <th>Process Number</th>
                <th>Pages</th>
                <th>Status</th>
                <th>Images</th>
                <th>Created Date</th>
            </tr>
        )

        var body = this.state.data.map(item => {
            return <tr key={item.id}>
            
                <td><Link to={"/requests/" + item.id}>{item.id} </Link></td>
                <td>{DateUtil.getDateFromLong(item.expiryDate*1000)}</td>
                <td>{item.clientRepresentative}</td>
                <td>{item.location}</td>
                <td>{item.subLocation}</td>
                <td>{item.processNumber}</td>
                <td>{item.pagesRange}</td>
                <td>{item.status}</td>
                <td>{item.countImages}</td>
                <td>{DateUtil.getDateFromLong(item.createdDate)}</td>
            </tr>
        })
        body = <tbody>{body}</tbody>

        return  <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true}/>
    }
}

export default RequestList





