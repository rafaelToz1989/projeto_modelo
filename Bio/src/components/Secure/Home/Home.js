import React, { Component } from 'react'
import HelpieUtil from '../../../util/HelpieUtil';
import ApiHelpies from '../../../api/ApiHelpies';
import UserCreditCard from '../../UserCreditCard/UserCreditCard'
import { Button } from 'reactstrap'
import ApiUsers from '../../../api/ApiUsers';
import Summary from '../../Summary/Summary';

class Home extends Component {

    constructor(props) {
        super(props)

        var quotationId;
        var quotation;

        if (props.location && props.location && props.location.quotationData) {
            quotationId = props.location.quotationData.helpieQuotationId
            quotation = props.location.quotationData;
        } else if (HelpieUtil.getNewHelpieInfo() != null) {
            quotationId = HelpieUtil.getNewHelpieInfo().helpieQuotationId
            quotation = HelpieUtil.getNewHelpieInfo()
        }

        this.state = {
            price: 0,
            skillId: 0,
            quotationId: quotationId,
            quotationData: quotation,
            cardHash: null
        }

        this.loadQuotation()
    }

    buildHelpieRequest = () => {
        return {
            subject: "Entrega",
            description: this.state.skillId,
            skill: {
                id: this.state.skillId
            },
            quotationId: this.state.quotationId,
            payment: {
                amount: parseFloat(this.state.price),
                creditCard: {
                    cardId: this.state.cardId
                }
            }
        }
    }

    doAddHelpie = () => {
        alert("Abrindo...")
        ApiUsers.doAddHelpie(this.buildHelpieRequest(), (response) => {
            alert("Sucesso")
            HelpieUtil.clearNewHelpieInfo()
        }, (error) => {
            console.log(error)
        })
    }

    loadQuotation = () => {
        ApiHelpies.getHelpieQuotation(this.state.quotationId, (response) => {
            this.setState({ price: response.price, skillId: response.skillId })
        }, (error) => {
            console.log(error)
        })
    }

    onSelectedCard = (cardId) => {
        this.setState({ cardId: cardId })
    }


    render() {

        let summary = "";

        if (this.state.quotationData) {
            summary = <Summary quotationData={this.state.quotationData} />;
        }

        console.log(this.props.location.quotationData);

        return (
            <div className="pb-5">
                {/* <div className="center-text" >
                    <h2>CRIAR RESUMO DO PEDIDO AQUI</h2>
                    Valor a pagar: {this.state.price}
                </div>  */}
                <div className="col-md-11 col-lg-11">
                    <div className="row">
                    <div className="offset-lg-4">
                        {summary}
                    </div>
                    </div>
                </div>
                <div>
                    <UserCreditCard onSelectedCard={this.onSelectedCard} />
                </div>
                <div>
                    <Button className="botao-cartao" onClick={this.doAddHelpie} disabled={this.state.price === 0}>Pagar Solicitação</Button>
                </div>
            </div>
        )
    }
}

export default Home