import React from 'react';
import Payment from 'payment';
import { Button } from 'reactstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import PagarmeUtil from '../../util/PagarmeUtil';
import ApiUsers from '../../api/ApiUsers';
import Error from '../Error/Error';
import { ClipLoader } from 'react-spinners';


export default class AddUserCreditCard extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: '',
            loading: false,
            isDisabled: false,
            msgError: ""
        };
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        console.log(target.name, target.value);

        if (this.state.number !== '' && this.state.name !== '' && this.state.expiry !== '' && this.state.cvc !== '') {
            this.setState({
                isDisabled: true,
            });
        } else {
            this.setState({
                isDisabled: false,
            });
        }

        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/ /g, ''),
            });
        } else if (target.name === 'expiry') {
            this.setState({
                [target.name]: target.value.replace(/ |\//g, ''),
            });
        } else {
            this.setState({
                [target.name]: target.value,
            });
        }


    }

    handleCallbackError(error) {
        //console.log(type, isValid); //eslint-disable-line no-console
        console.log(error.message); //eslint-disable-line no-console
        this.setState({ msgError: error.message })
    }


    saveCreditCard = (e) => {

        this.setState({ loading: true })
        PagarmeUtil.doCardHash(this.state.number, this.state.name, this.state.expiry, this.state.cvc, (card_hash) => {
            ApiUsers.doAddUserCreditCard(card_hash, (response) => {
                this.props.onAddCreditCardSuccess()
            }, (error) => {
                this.setState({ loading: false })
                this.handleCallbackError(error)
                console.log(error)
            })
        }, (error) => {
            this.setState({ loading: false })
            this.handleCallbackError(error)
            console.log(error)
        })
    }

    render() {
        const { name, number, expiry, cvc, focused } = this.state;

        if (this.state.msgError !== '') {
            var messageError = <Error message='Houve um erro no envio do cartão, consulte nosso suporte.' />
        }
        return (
            <div className="container-fluid px-5 pt-5">
                <p className="text-center">Insira os dados do seu cartão, abaixo:</p>
                <div className="col-md-6 col-lg-6 offset-lg-3 pt-3">
                    <Cards
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />
                        <form>
                            {/* <div className="row"> */}
                            <div className="form-group pt-4">
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Número do cartão"
                                    className="form-control"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            {/* </div> */}
                            <div className="row">
                                <div className="form-group col-md-12 col-lg-12">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nome portador"
                                        className="form-control"
                                        onKeyUp={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                            </div>
                            <div className="row col-md-12 col-lg-12">
                                <div>
                                    <input
                                        type="tel"
                                        name="expiry"
                                        placeholder="Validade"
                                        maxLength="7"
                                        className="form-control"
                                        onKeyUp={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>

                                <div className="form-group col-md-3 col-lg-3">
                                    <input
                                        type="tel"
                                        name="cvc"
                                        placeholder="CVV"
                                        className="form-control"
                                        onKeyUp={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                            </div>

                            <Button color="primary" onClick={this.saveCreditCard} disabled={!this.state.isDisabled || this.state.loading}>{this.state.loading ?
                                <div className='sweet-loading pt-1'>
                                    <ClipLoader
                                        color={'#D3DBDA'}
                                        size={35}
                                        loading={this.state.loading}
                                    />
                                </div> : "ADICIONAR CARTÃO"}</Button>
                            <div className="pl-3 pt-3">
                                {messageError}
                            </div>
                        </form>
                </div>
            </div>
            
        );
    }
}

