import React, { Component } from 'react';
import ValidationUtil from '../../util/ValidationUtil';
import ApiUsers from '../../api/ApiUsers';
import { Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import { ClipLoader } from 'react-spinners';
import AuthUtil from '../../util/AuthUtil';
import Summary from '../Summary/Summary';
import { Link } from 'react-router-dom';
import HelpieUtil from '../../util/HelpieUtil';


class Login extends Component {

    constructor(props) {
        super(props)

        var quotation = null
        if(props.location && props.location && props.location.quotationData){
            quotation = props.location.quotationData;
       } else if(quotation == null) {
           quotation = HelpieUtil.getNewHelpieInfo()
       }

        this.state = {
            login: "",
            senha: "",
            errorMsg: "",
            loading: false,
            quotationData: quotation,
            userInfo: AuthUtil.getUserInfo()
        }
    }

    setLogin = (e) => {
        this.setState({ login: e.target.value, errorMsg: '' })
    }

    setSenha = (e) => {
        this.setState({ senha: e.target.value, errorMsg: '' })
    }


    validateLogin = () => {
        return {
            login: !ValidationUtil.validateEmail(this.state.login),
            senha: !ValidationUtil.validatePassword(this.state.senha)
        };
    }



    doLogin = (e) => {
        e.preventDefault()
        const errors = this.validateLogin();
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if (!isDisabled) {
            if (this.state.quotationData && this.state.quotationData.pontos) {
                var infoPontos = this.state.quotationData.pontos.map(ponto => {
                    return {
                        lat: ponto.lat,
                        lng: ponto.lng,
                        address: ponto.endereco,
                        address2: ponto.complemento,
                        action: ponto.tipoEntrega,
                        actionNotes: ponto.opcaoRetirarDescricao,
                        notification: {
                            type: "sms",
                            value: 11 - 994804100
                        }
                    }
                });

                var helpie = {

                    skillId: "",
                    points: [infoPontos],
                    estimatedPrice: this.state.quotationData.price,
                    estimatedTime: this.state.quotationData.time,
                    estimatedDistance: this.state.quotationData.distance

                };
            }

            this.setState({ loading: true })
            ApiUsers.doUserLogin(this.state.login, this.state.senha.toString(), helpie, (response) => {
                this.setState({ userInfo: response.user }, () => this.saveUserInfo(response.user) )
            }, (error) => {
                this.setState({ errorMsg: error.message, loading: false }, () => console.log(this.state.errorMsg))
            })
        }
    }

    saveUserInfo = (user) => {
        AuthUtil.setToken(user.device.token)
        AuthUtil.setUserInfo(user)
    }

    cleanState = () => {
        this.setState({ login: "", senha: "" })
    }


    render() {

        // console.log(this.state.quotationData);

        if (this.state.userInfo != null) {
            return <Redirect push to={{
                pathname: '/app',
                quotationData: this.state.quotationData,
                userInfo: this.state.userInfo
            }} />
        }

        const errors = this.validateLogin();
        const isDisabled = Object.keys(errors).some(x => errors[x]);


        if (this.state.errorMsg !== '') {
            var messageError = <Error message='Falha na autenticação. Verifique seu usuário e senha.' />
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
                        <div className="col-md-7 col-lg-7">
                            <div className="pb-5 px-2 mx-5 mt-5">
                                <h2 className="pt-5" style={{ textAlign: 'center' }}>Digite seu login e senha para acessar:</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-12 pt-5">
                                    <form onSubmit={this.doLogin}>
                                        <div className="row">
                                            <div className="form-group offset-lg-2 col-md-4 col-lg-4">
                                                <label htmlFor="InputName1" className="formText">Login</label>
                                                <input type="text" className="form-control input-field" autoComplete="email" id="login" onChange={this.setLogin} aria-describedby="loginHelp1" name="login" placeholder='digite...' />
                                            </div>
                                            <div className="form-group col-md-4 col-lg-4">
                                                <label htmlFor="InputName2## Heading ##" className="formText">Senha</label>
                                                <input type="password" className="form-control input-field" autoComplete="current-password" id="password" onChange={this.setSenha} aria-describedby="passwordHelp2" name="password" placeholder='digite...' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-lg-2 col-lg-8 py-4 mt-4">
                                                <Link to={{ pathname: '/app/esqueci', state: { loginState: this.state } }} onClick={this.cleanState} className="col-md-3 btn pl-0 mr-2 link-entrar">Esqueceu sua senha?</Link>
                                                <button type="submit" className="col-md-6 btn btn-primary float-right" disabled={isDisabled || this.state.loading} onClick={this.doLogin}>{this.state.loading ?
                                                    <div className='sweet-loading pt-1'>
                                                        <ClipLoader
                                                            color={'#D3DBDA'}
                                                            size={35}
                                                            loading={this.state.loading}
                                                        />
                                                    </div> : "Entrar"}
                                                </button>
                                                <div className="offset-lg-3 pl-5 pt-3">
                                                    {messageError}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;