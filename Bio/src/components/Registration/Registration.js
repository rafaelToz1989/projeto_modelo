import React, { Component } from 'react';
import './Registration.css';
import RegisterName from '../RegisterName/RegisterName';
import RegisterCellphone from '../RegisterCellphone/RegisterCellphone';
import RegisterEmail from '../RegisterEmail/RegisterEmail';
import RegisterPassword from '../RegisterPassword/RegisterPassword';
import RegisterPromocode from '../RegisterPromocode/RegisterPromocode';
import Summary from '../Summary/Summary';
import ApiUsers from '../../api/ApiUsers';
import AuthUtil from '../../util/AuthUtil';
import { Redirect } from 'react-router-dom';
import HelpieUtil from '../../util/HelpieUtil';


class Registration extends Component {

    constructor(props) {
        super(props)

        let quotation = null;
       
        
        if(props.location && props.location && props.location.quotationData){
             quotation = props.location.quotationData;
        } else if(quotation == null) {
            quotation = HelpieUtil.getNewHelpieInfo()
        }


        console.log(quotation)


        this.state = {
            nome: '',
            sobrenome: '',
            celular: '',
            email: '',
            password: '',
            promocode: '',
            errorMsg: '',
            changeComponent: 1,
            quotationData: quotation,
            userInfo: AuthUtil.getUserInfo()
        }

    }

    handleApiError = () =>{
        if (this.state.errorMsg === 'KEY_USER_ALREADY_EXISTS') {
            this.setState({ changeComponent: 3 });
        }
    }

    doRegister = (e) => {

        // if (!isDisabled) {
        //     if (this.state.quotationData && this.state.quotationData.pontos) {
        //         var infoPontos = this.state.quotationData.pontos.map(ponto => {
        //             return {
        //                 lat: ponto.lat,
        //                 lng: ponto.lng,
        //                 address: ponto.endereco,
        //                 address2: ponto.complemento,
        //                 action: ponto.tipoEntrega,
        //                 actionNotes: ponto.opcaoRetirarDescricao,
        //                 notification: {
        //                     type: "sms",
        //                     value: 11 - 994804100
        //                 }
        //             }

        //         });

        //         var helpie = {

        //             skillId: "",
        //             points: [infoPontos],
        //             estimatedPrice: this.state.quotationData.price,
        //             estimatedTime: this.state.quotationData.time,
        //             estimatedDistance: this.state.quotationData.distance

        //         };
        //     }

            
            ApiUsers.doRegister(this.state.email, this.state.nome, this.state.sobrenome, this.state.password.toString(), 11, this.state.celular, (response) => {
                console.log(response)
                this.registerPromocode.turnOffLoading();
                this.setState({ userInfo: response.user })
                AuthUtil.setToken(response.user.device.token)
            }, (error) => {
                this.registerPromocode.turnOffLoading();
                this.setState({ errorMsg: error.message, loading: false }, () => this.handleApiError())  
            })
        }

    setNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    setSobrenome = (event) => {
        this.setState({ sobrenome: event.target.value })
    }

    setCelular = (celularState) => {
        this.setState({ celular: celularState })
    }


    setEmail = (emailState) => {
        this.setState({
            email: emailState,
        })
    }

    setPassword = (passwordState) => {
        this.setState({
            password: passwordState,
        })
    }

    setPromocode = (event) => {
        this.setState({
            promocode: event.target.value
        })
    }

    setPromocode = (event) => {
        this.setState({
            promocode: event.target.value
        })
    }

    passoAnterior = () => {
        if (this.state.changeComponent === 2) {
            this.setState({ changeComponent: 1});
        } else if (this.state.changeComponent === 3) {
            this.setState({ changeComponent: 2 });
        } else if (this.state.changeComponent === 4) {
            this.setState({ changeComponent: 3 });
        }else if (this.state.changeComponent === 5) {
            this.setState({ changeComponent: 4});
        }
    }

    changeComponent = () => {

        if (this.state.changeComponent === 1) {
            this.setState({ changeComponent: 2 });
        } else if (this.state.changeComponent === 2) {
            this.setState({ changeComponent: 3 });
        } else if (this.state.changeComponent === 3) {
            this.setState({ changeComponent: 4, errorMsg: ""  });
        } else if (this.state.changeComponent === 4) {
            this.setState({ changeComponent: 5});
        } else if (this.state.changeComponent === 5) {
            this.setState({ changeComponent: 6 });
        }
    }

    render() {

        if (this.state.userInfo != null) {
            return <Redirect push to={{
                pathname: '/app',
                quotationData: this.state.quotationData,
                userInfo: this.state.userInfo
            }} />
        }
        

        
        let messageTitle;


        if (this.state.changeComponent === 1) {
            messageTitle = 'Criar sua conta é simples: É só preencher os campos e começar a entregar!';
            
            this.component = <RegisterName
                nome={this.state.nome}
                sobrenome={this.state.sobrenome}
                setNome={this.setNome}
                setSobrenome={this.setSobrenome}
                changeComponent={this.changeComponent}
                quotationData={this.state.quotationData}

            />;
        } else if (this.state.changeComponent === 2) {
            messageTitle = 'Informe o número do seu celular'

            this.component = <RegisterCellphone
                celular={this.state.celular}
                setCelular={this.setCelular}
                changeComponent={this.changeComponent}
                passoAnterior={this.passoAnterior}
            />;
        } else if (this.state.changeComponent === 3) {
            messageTitle = 'Informe o email. Ele será também o seu login.'

            this.component = <RegisterEmail
                email={this.state.email}
                setEmail={this.setEmail}
                changeComponent={this.changeComponent}
                passoAnterior={this.passoAnterior}
                errorMsg={this.state.errorMsg}
            />;
        } else if (this.state.changeComponent === 4) {
            messageTitle = 'Agora crie uma senha.'

            this.component = <RegisterPassword
                password={this.state.password}
                setPassword={this.setPassword}
                changeComponent={this.changeComponent}
                passoAnterior={this.passoAnterior}
            />;
        } else if (this.state.changeComponent === 5) {
            messageTitle = this.state.nome + ', para finalizar seu cadastro, informe um código de convite (caso tenha).';

            this.component = <RegisterPromocode
                promocode={this.state.promocode}
                setPromocode={this.setPromocode}
                changeComponent={this.changeComponent}
                doRegister={this.doRegister}
                passoAnterior={this.passoAnterior}
                ref={(x) => { this.registerPromocode = x; }} 
            />;
        }

        
        let summary = "";

        if (this.state.quotationData) {
            summary = <Summary  quotationData={this.state.quotationData} />;
        }
       
        if (this.state.userInfo != null) {
            return <Redirect push to={{
                pathname: '/app',
                state: { userInfo: this.state.userInfo }
            }} />
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
                                <h2 className="pt-5" style={{ textAlign: 'center' }}>{messageTitle}</h2>
                            </div>
                            <div className="row">
                                {this.component}
                                {/* <div className="row"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
