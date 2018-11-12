import React, { Component } from 'react';
import ApiUsers from '../../api/ApiUsers';
import CustomTable from '../Secure/CustomTable/CustomTable';
import AddUserCreditCard from '../PaymentsMethod/AddUserCreditCard';
import './UserCreditCard.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    // ModalFooter,
    Container
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';

class Requests extends Component {

    title = "Meios de Pagamento";
    emptyMsg = "Não há dados a serem exibidos.";


    constructor(props) {
        super(props)

        this.state = {
            data: [],
            errorMsg: "",
            modal: false,
            loading: false
        };
    }

    componentDidMount() {
        this.getCreditCardList()
    }


    closeModal() {
        this.setState({
            modal: false
        });
    }

    onAddCreditCardSuccess = () => {
        this.closeModal()
        this.getCreditCardList()
    }

    deleteCreditCard = (cardId) => {
        this.setState({ loading: true })
        ApiUsers.deleteUserCreditCard(cardId, (response) => {
            this.getCreditCardList()
            this.setState({ loading: false })
        }, (error) => {
            this.setState({ errorMsg: error.message, loading: false })
        })
    }

    getCreditCardList = () => {
        ApiUsers.getUsersPaymentMethods((response) => {
            this.setState({ data: response })
        }, (error) => {
            this.setState({ errorMsg: error.message })
        })
    }

    showModal = () => {
        this.setState({
            modal: true
        });
        console.log(this.state);
    }

    render() {

        var header;

        if (this.props.onSelectedCard) {
            header = (<tr>
                <th><Button className="btn btn-primary botao-cartao" onClick={this.showModal.bind(this, 'modal')}>ADICIONAR</Button></th>
                <th></th>
                <th>Nome</th>
                <th>Últimos Digitos</th>
                <th></th>
            </tr>)
        } else {
            header = (<tr>
                <th><Button className="btn btn-primary botao-cartao" onClick={this.showModal.bind(this, 'modal')}>ADICIONAR</Button></th>
                <th>Nome</th>
                <th>Últimos Digitos</th>
                <th></th>
            </tr>)
        }


        var body = this.state.data.map(item => {

            var brand;
            switch (item.brand) {
                case "visa": {
                    brand = <img src="https://s3-sa-east-1.amazonaws.com/prd-helpie-images-email/creditcard_visa.png" alt="Cartão Visa Crédito" />;
                    break;
                }
                case "mastercard": {
                    brand = <img src="https://s3-sa-east-1.amazonaws.com/prd-helpie-images-email/creditcard_mastercard.png" alt="Cartão Mastercard Crédito" />;
                    break;
                }
                case "amex": {
                    brand = <img src="https://s3-sa-east-1.amazonaws.com/prd-helpie-images-email/creditcard_amex.png" alt="Cartão American Express Crédito" />;
                    break;
                }
                case "elo": {
                    brand = <img src="https://s3-sa-east-1.amazonaws.com/prd-helpie-images-email/creditcard_elo.png" alt="Cartão Elo Crédito" />;
                    break;
                }
                default: {
                    brand = <i className="material-icons md-18" style={{ verticalAlign: "middle", lineHeight: "30px", height: "30px" }}>credit_card</i>;
                    break;
                }
            }

            // var status = item.status === 'AVAILABLE' ? 'Em andamento': 'Concluído';

            if (this.props.onSelectedCard) {
                return <tr key={item.cardId}>
                    {/* <td><i className="material-icons md-18" style={{verticalAlign: "middle", lineHeight: "30px", height: "30px"}}>{brand}</i></td> */}
                    <td><input type="radio" name="creditCard" value="male" onClick={() => this.props.onSelectedCard(item.cardId)} /></td>
                    <td>{brand}</td>
                    <td>{item.holderName}</td>
                    <td>{item.lastDigits}</td>
                    <td className="hyperlink"><a onClick={() => this.deleteCreditCard(item.cardId)}>{this.state.loading ?
                        <div className='sweet-loading pt-1'>
                            <ClipLoader
                                color={'#D3DBDA'}
                                size={35}
                                loading={this.state.loading}
                            />
                        </div> : "excluir"}</a></td>
                </tr>
            } else {
                return <tr key={item.cardId}>
                    {/* <td><i className="material-icons md-18" style={{verticalAlign: "middle", lineHeight: "30px", height: "30px"}}>{brand}</i></td> */}
                    <td>{brand}</td>
                    <td>{item.holderName}</td>
                    <td>{item.lastDigits}</td>
                    <td className="hyperlink"><a onClick={() => this.deleteCreditCard(item.cardId)}>{this.state.loading ?
                        <div className='sweet-loading pt-1'>
                            <ClipLoader
                                color={'#D3DBDA'}
                                size={35}
                                loading={this.state.loading}
                            />
                        </div> : "excluir"}</a></td>
                </tr>
            }




        })

        body = <tbody>{body}</tbody>



        return (
            <div className="home">
                <CustomTable title={this.title} header={header} body={body} emptyMsg={this.emptyMsg} errorMsg={this.state.errorMsg} loading={true} />
                <Container>
                    <Modal className="modal-credito" isOpen={this.state.modal} toggle={this.closeModal.bind(this, 'modal')}>
                        <ModalHeader toggle={this.closeModal.bind(this, 'modal')}>
                        </ModalHeader>
                        <ModalBody>
                            <AddUserCreditCard onAddCreditCardSuccess={this.onAddCreditCardSuccess} />
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        )

    }
}

export default Requests