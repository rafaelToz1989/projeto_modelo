import React, { Component } from 'react'
import Quotation from '../Quotation/Quotation';
import './PointDetail.css';
import NumberUtil from '../../util/NumberUtil';


class PointDetail extends Component {
    constructor(props) {
        super(props)

        var pontoAt = props.pontos[props.pontoAtual]
        if (pontoAt != null) {
            var enderecoPonto = pontoAt.endereco
            var complementoPonto = pontoAt.complemento

        }

        // console.log("pontoAt:" + props.pontoAtual)
        // console.log("pontoAt:" + JSON.stringify(pontoAt))

        this.state = {
            endereco: enderecoPonto,
            complemento: complementoPonto,
            smsOuEmail: this.props.smsEmail,
            descricao: this.props.descricao,
            pontoAtual: this.props.pontoAtual,
            selectOptionSmsEmail: ""
        }

        console.log(props.ponto);

    }


    // sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    //   }

    async selectText(component, start, end) {
        // await this.sleep(500);

        component.focus()
        component.setSelectionRange(start, end);

    }

    selecionaStringNome = (event) => {

        // console.log(this.descricao);



        // const pos = this.descricao.value.indexOf('NOME');
        // if(pos > 0){
        //     this.selectText(this.descricao, pos, pos + 4);
        // }        

        this.setDescricao(event.target.value)

    }

    setDescricao = (value) => {
        this.setState({
            descricao: value
        })

        this.props.descricaoFunction(this.state.pontoAtual, value)

        console.log(value);
    }

    setSmsOuEmail = (event) => {

        this.setState({
            smsOuEmail: event.target.value
        })

        this.props.smsEmailFunction(this.state.pontoAtual, event.target.value)
    }

    handleClickButton = (evento) => {
        //  console.log(document.querySelectorAll("#option1, #option2, #option3").classList)

        let myButtonClasses1 = document.getElementById("option1").classList;
        let myButtonClasses2 = document.getElementById("option2").classList;
        // let myButtonClasses3 = document.getElementById("option3").classList;

        let allClasses = "btn btn-outline-info btn-sm mr-2 active";



        if (evento.target.value === "option1") {

            myButtonClasses2.remove("active")
            // myButtonClasses3.remove("active")
            document.getElementById("option1").className = allClasses

            this.descricao.value = 'Coletar documento ou volume com NOME';

            this.setState({ opcaoRetirar: evento.target.value })


            this.deliveryDescription = 'Coleta';
            this.props.setTipoEntrega(this.deliveryDescription)



        } else if (evento.target.value === "option2") {

            myButtonClasses1.remove("active")
            // myButtonClasses3.remove("active")
            document.getElementById("option2").className = allClasses

            this.descricao.value = "Entregar documento ou volume para NOME";

            this.setState({ opcaoRetirar: evento.target.value })


            this.deliveryDescription = 'Entrega';
            this.props.setTipoEntrega(this.deliveryDescription)


        } else if (evento.target.value === "option3") {

            myButtonClasses1.remove("active")
            myButtonClasses2.remove("active")
            document.getElementById("option3").className = allClasses

            this.descricao.value = "";

            this.setState({ opcaoRetirar: evento.target.value })

            this.deliveryDescription = 'Outros';
            this.props.setTipoEntrega(this.deliveryDescription)


        }
        const pos = this.descricao.value.indexOf('NOME');
        if (pos > 0) {
            this.selectText(this.descricao, pos, pos + 4);    

        }
    }

    setSelectedOptionButton = (changeEvent) =>{
        this.setState({
            smsOuEmail: "",
            selectOptionSmsEmail: changeEvent.target.value
          });
    }

    render() {
        // console.log(this.props)
        // console.log(this.props.pontos, this.props.opcaoRetirarDescricao)
        var id = this.props.pontoAtual
        this.props.pontos.find(function (element) {
            return element.ponto === id;
        });

        //Controle de rota e botão de disable
        // if(!this.state.descricao){

        //     var route = <button type="button" className="btn btn-primary" disabled={!this.state.descricao}>Próximo</button>
        // }else{
        //     route =  <Link to="/points" onClick={this.props.mudaFlagEstado} className="btn btn-primary">Próximo</Link>
        // }

        //Controle de input da descrição
        const flagEstado = this.props.flagEstado;

        if (flagEstado === "progress") {

            var input = <textarea id="toFocus" className="form-control" rows="3" onChange={this.selecionaStringNome} ref={(x) => { this.descricao = x; }}></textarea>
        } else if (flagEstado === "done") {
            input = <textarea id="toFocus" className="form-control" rows="3" onChange={this.selecionaStringNome} value={this.state.descricao} ref={(x) => { this.descricao = x; }}></textarea>
        }

        var price = this.props.price;
        var time = this.props.time;
        var distance = this.props.distance;
        var quotation = "";

        if (price && time && distance) {
            quotation = <Quotation
                price={NumberUtil.getDoubleAsCurrency(price)}
                time={this.props.time}
                distance={distance.replace(".", ',')}
            />;
        }

        var action = "";        
        if (this.state.opcaoRetirar) {
            action = '(' + this.deliveryDescription + ')' 
        }

        // let inputSmsEmail;

        // if (this.state.selectOptionSmsEmail === 'sms') {
        //     inputSmsEmail =  <InputMask mask="(99)99999-9999" type="tel" className="form-control l col-md-6" id="celphone"
        //     value={this.state.smsOuEmail} onChange={this.setSmsOuEmail} aria-describedby="phonehelpie" name="celphone" placeholder='digite...' />

        // }else if (this.state.selectOptionSmsEmail === 'email'){
            // inputSmsEmail =  <input onChange={this.setSmsOuEmail} value={this.state.smsOuEmail} type="text" className="form-control col-md-6" placeholder='digite...'></input>

        // }

        return (
            <div className="px-5 pt-5">
                <div>
                    <h1 className="h4 text-secondary pointTitle">Percurso</h1>
                </div>
                <div className="no-gutter col-xs-12">
                    <div className="divider"></div>
                </div>
                <div className="pt-4">
                    <div className="form-group">
                        <a id="force-white" className="badge badge-secondary badge-logX">{this.state.pontoAtual + 1 + 'º'}</a><span className="retirada">{'Ponto ' + action}</span>
                        <div className="address-group">
                            <label className="address">{this.state.endereco}</label>
                            <label className="address">{this.state.complemento}</label>
                            {/* <Link to="/point" onClick={() => this.props.mudaFlag(id) } className="chageAddress">alterar</Link>|
                            <Link to="/point" onClick={() => this.props.excluiPonto(id) } className="chageAddress">excluir</Link> */}
                        </div>
                    </div>
                </div>
                <div className="pt-1">
                    <label>O que o mensageiro deve fazer?</label>
                </div>
                <div className="form-group">
                    <button type="button" id="option1" className="btn btn-outline-info btn-sm mr-2" onClick={this.handleClickButton} value="option1">Coletar</button>
                    <button type="button" id="option2" className="btn btn-outline-info btn-sm mr-2" onClick={this.handleClickButton} value="option2">Entregar</button>
                    {/* <button type="button" id="option3" className="btn btn-outline-info btn-sm mr-2" onClick={this.handleClickButton} value="option3">Outros Serviços</button> */}
                </div>
                <div>
                    {input}
                </div>
                <div className="pt-4">
                    {/* <div className="form-group">

                        <label htmlFor="formGroupExampleInput">Notificar por SMS ou email</label>
                        <div className="radio">
                            <label>
                                <input type="radio" value="sms" className="mx-2" checked={this.state.selectOptionSmsEmail === 'sms'} onChange={this.setSelectedOptionButton} />
                                SMS
                                <input type="radio" value="email" className="mx-2" checked={this.state.selectOptionSmsEmail === 'email'} onChange={this.setSelectedOptionButton} />
                                E-mail
                            </label>
                        </div>
                        {inputSmsEmail}
                    </div> */}
                </div>
                <div className="w-100"></div>
                <div className="footer">
                    <div className="col-xs-12">
                        {quotation}
                    </div>
                    {/* {route} */}
                </div>
            </div>
        );
    }
}

export default PointDetail;