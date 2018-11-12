import React, { Component } from 'react';
import ApiUsers from '../../api/ApiUsers';
import DateUtil from '../../util/DateUtil';
import CustomTable from '../Secure/CustomTable/CustomTable';
import './Notifications.css'
import LocalizationUtil from '../../util/LocalizationUtil';

class Notifications extends Component {

    title = "Notificações";
    emptyMsg = "Não há dados a serem exibidos.";

    constructor(props) {
        super(props)


        this.state = {
            data: [],
            errorMsg: ""
        };
    }

    componentDidMount() {

        ApiUsers.GetNotificationsByUserId((response) => {
            this.setState({ data: response })
        }, (error) => {
            this.setState({ errorMsg: error.message })
        })
    }

    render() {
        const header = (
            <tr>

            </tr>
        )


        var body = this.state.data.map(item => { 
            var icon = item.icon != null ? item.icon : "https://s3-sa-east-1.amazonaws.com/prd-helpie-images-public/29x29_3x.png"
            var message = LocalizationUtil.getLocalizationByKey(item.message)
            message = message != null ? message : item.message

            var title = LocalizationUtil.getLocalizationByKey(item.title)
            title = title != null ? title : item.title

            var read = !item.read ? <span class="badge badge-secondary">Nova</span> : null
            var readRowStyle = !item.read ? {backgroundColor: "#fbf7d5"} : null

            return <tr key={item.id} style={readRowStyle}>
                <td> <img src={icon} className="notification-icon" alt="icon" /></td>
                <td style={{textAlign: "left"}}><strong>{title} {read}</strong><br/>{message}<br /><span style={{ fontSize: "small" }}>{DateUtil.getDateFromLong(item.createdDate)}</span></td>

            </tr>
        })

        body = <tbody>{body}</tbody>



        return (
            <div className="home">
                <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true} />
            </div>
        )

    }
}

export default Notifications