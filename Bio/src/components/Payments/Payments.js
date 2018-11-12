import React, { Component } from 'react';
import ApiUsers from '../../api/ApiUsers';
import CustomTable from '../Secure/CustomTable/CustomTable';
import DateUtil from '../../util/DateUtil';
import NumberUtil from '../../util/NumberUtil';


class Payments extends Component {
    title = "Pagamentos";
    emptyMsg = "Não há dados a serem exibidos.";


    constructor(props) {
        super(props)


        this.state = {
            data: [],
            errorMsg: ""
        };
    }

    componentDidMount() {

        ApiUsers.getPaymentsByUser((response) => {
            this.setState({ data: response })
        }, (error) => {
            this.setState({ errorMsg: error.message })
        })
    }


    render() {
        const header = (
            <tr>
                <th>Data</th>
                <th>Status</th>
                <th>Helpie</th>
                <th>Helper</th>
                <th>Meio de Pagamento</th>
                <th style={{textAlign: "right"}}>Valor Pago</th>
                
            </tr>
        )


        var body = this.state.data.map(item => {
            var status = ""
            var statusClassName = ""
            if(item.refunded){
                status = "Estornado"
                statusClassName = "badge badge-danger"
            } else if(item.released) {
                status = "Liberado"
                statusClassName = "badge badge-success"
            } else {
                status = "Aguardando Liberação"
                statusClassName = "badge badge-warning"
            }
            var installments = item.installments === 1 ? 'a vista' : "em " + item.installments + "x"
            var promo = item.promo != null ? item.promo.code + " - " + item.promo.type + " - " + item.promo.discount : null
            var helper = item.helper != null ? item.helper.helperName : null


            return <tr key={item.id}>
                <td><span style= {{fontSize: "small"}}>{DateUtil.getDateFromLong(item.paymentDate)}</span></td>
                <td> <span className={statusClassName}>{status} </span></td>
                <td>{item.helpie.subject}</td>
                <td>{helper}</td>
                <td>***{item.creditCard.lastDigits}</td>
                <td style={{textAlign: "right"}}>{NumberUtil.getDoubleAsCurrency(item.paid)}
                    <br/>
                    <span style={{fontSize: "smaller"}}>{installments}</span>
                    <br/>
                    {promo}
                </td>
                
                
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

export default Payments