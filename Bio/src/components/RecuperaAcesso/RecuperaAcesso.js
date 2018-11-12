import React, { Component } from 'react';
import '../Registration/Registration.css';
import { ClipLoader } from 'react-spinners';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';
import Summary from '../Summary/Summary';
import ApiUsers from '../../api/ApiUsers';
import { Link } from 'react-router-dom';
import ValidationUtil from '../../util/ValidationUtil';

class RecuperaAcesso extends Component {

    constructor(props) {
        super(props)

        var login = "";
        var quotation = "";
        
        if (this.props != null && this.props.location != null && this.props.location.state != null && this.props.location.state.loginState != null) {
            login = this.props.location.state.loginState.login
            quotation = this.props.location.state.loginState.quotationData
        }

        this.state = {
            login: login,
            recoveryMsg: "",
            valid: false,
            loading: false,
            quotationData: quotation
        }
    }

    componentDidMount() {
        if (this.state.login) {
            this.validateAndStore(this.state.login)
        }

        this.setState({ recoveryMsg: "" })
    }

    validateEmail = (email) => {
        return ValidationUtil.validateEmail(email)
    }

    handleChangeEmail = (e) => {

        const email = e.target.value;
        this.validateAndStore(email);

    }
    validateAndStore = (email) => {
        const emailValid = this.validateEmail(email)

        this.setState({ valid: emailValid, login: email, recoveryMsg: "" })

    }


    doRecoverPassword = () => {

        this.setState({ loading: true });
        ApiUsers.doForgotPassword(this.state.login, () => {
            this.setState({ recoveryMsg: "Mensagem enviada com sucesso.", loading: false })
        }, () => {
            this.setState({ recoveryMsg: "Não foi possível recuperar sua senha, tente mais tarde!", loading: false })
        })
    }


    render() {

        let fieldContainerClass;

        const valid = this.state.valid

        let displayMessage = "Digite um email válido";

        if (!valid) {
            fieldContainerClass = 'span-message'
        } else {
            fieldContainerClass = 'field-container'
        }

        if (this.state.recoveryMsg === "Mensagem enviada com sucesso.") {
            displayMessage = this.state.recoveryMsg;
            fieldContainerClass = 'span-message-success'
        } else if (this.state.recoveryMsg === "Não foi possível recuperar sua senha, tente mais tarde!") {
            displayMessage = this.state.recoveryMsg;
            fieldContainerClass = 'span-message'
        }

        let summary = "";

        if (this.state.quotationData) {
            summary = <Summary quotationData={this.state.quotationData} />;
        }


        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-5">
                            <div id="placeholder">{summary}</div>
                        </div>
                        <div className="col-md-7 col-lg-7 pt-5">
                            <div className="pb-5 px-2 mx-5 mt-5 pt-5">
                                <h2 className="pt-5" style={{ textAlign: 'center' }}>Insira o seu endereço de email cadastrado:</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-12 pt-5">
                                    <div className="row">
                                        <div className="form-group offset-lg-2 col-md-8 col-lg-8">
                                            <label htmlFor="InputName1">Email</label>
                                            <input type="text" className="form-control input-field" id="recuperarEmail" value={this.state.login} onChange={this.handleChangeEmail} aria-describedby="recuperarEmaillhelpie" name="recuperarEmail" placeholder='Digite seu email:' />
                                            <span className={fieldContainerClass}>{displayMessage}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="offset-lg-2 col-lg-8 pt-4 mt-4">
                                            <Link to="/app/login" className="col-md-3 btn mr-3 link-entrar" >Voltar</Link>
                                            <button type="button" className="col-md-6 btn btn-primary"
                                                onClick={this.doRecoverPassword} disabled={!this.state.valid || this.state.loading}>{this.state.loading ?
                                                    <div className='sweet-loading pt-1'>
                                                        <ClipLoader
                                                            color={'#D3DBDA'}
                                                            size={35}
                                                            loading={this.state.loading}
                                                        />
                                                    </div> : "Recuperar"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecuperaAcesso;