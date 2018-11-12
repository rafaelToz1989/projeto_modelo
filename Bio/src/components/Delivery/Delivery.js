import React, { Component } from 'react';
import Map from '../Map/Map'
import Point from '../Point/Point'
import PointDetail from '../PointDetail/PointDetail';
import Points from '../Points/Points'
import HelpieUtil from '../../util/HelpieUtil';
import ApiHelpies from '../../api/ApiHelpies';
import { Redirect } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Error from '../Error/Error';


class Delivery extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showMarker: false,
            pontos: [],
            flag: 'include',
            flagEstado: 'progress',
            endereco: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            placeId: "",
            estado: "",
            cep: "",
            lat: "",
            lng: "",
            ponto: 0,
            opcaoRetirarDescricao: "",
            notificacaoSmsEmail: "",
            otimizaRota: false,
            osGerada: "",
            loading: true,
            loadingQuotation: false,
            content: '',
            changeComponent: 1,
            tipoEntrega: '',
            deliveryQuotation: null,
            quotationId: null,
            quotationDetailId: null,
            helpieQuotationId: null,
            msgError: ""
        }

        this.handleChangeEndereco = this.handleChangeEndereco.bind(this)
    }


    getQuotation() {
        console.log(this.state.pontos.length)
        if (this.state.pontos.length > 1) {

            this.setState({
                price: "",
                distance: "",
                time: ""
            })

            var self = this

            ApiHelpies.addDeliveryQuotation(this.buildHelpieDeliveryOrder(), (response) => {
                var primaryQuotation = response.details[0]
                console.log(primaryQuotation)
                self.setState({
                    deliveryQuotation: response,
                    quotationId: response.id,
                    quotationDetailId: primaryQuotation.quotationXId,
                    price: primaryQuotation.price,
                    distance: primaryQuotation.distance,
                    time: primaryQuotation.duration,
                    loading: false
                })
            }, (error) => {
                console.log(error)
            })
        }
    }

    handleDeleteEndereco = (pontoAtual) => {

        let arrayPontos = this.state.pontos
        let deletePontos = this.state.pontos.slice() //copy the array
        console.log("delete: " + pontoAtual);
        deletePontos.splice(pontoAtual, 1)
        if (arrayPontos.length < 3) {

            this.setState({
                price: "",
                distance: "",
                time: ""
            })
        }

        this.setState({
            pontos: deletePontos,
            flag: 'include',
            endereco: "",
            numero: "",
            complemento: "",
            opcaoRetirarDescricao: "",
            tipoEntrega: "",
            notificacaoSmsEmail: ""
        }, () => this.getQuotation())

        this.map.forceUpdate();
    }

    addPonto = () => {
        console.log(this.state.numero);
        console.log(this.state.flag)
        //adicionar a condição se tiver numero

        var exists = this.state.pontos.some(item => item.ponto === this.state.ponto)
        if (!exists) {
            console.log("OPA3:" + this.state.numero);
            if (this.state.numero !== 0) {
                this.state.pontos.push({
                    ponto: this.state.ponto,
                    endereco: this.state.endereco,
                    numero: this.state.numero,
                    complemento: this.state.complemento,
                    bairro: this.state.bairro,
                    cidade: this.state.cidade,
                    placeId: this.state.placeId,
                    estado: this.state.estado,
                    cep: this.state.cep,
                    lat: this.state.lat,
                    lng: this.state.lng,
                })

                console.log(this.state.pontos);
                this.setState({ flag: "edit" })
                this.setState(this.state)
            }

        } else {
            this.editPoint(this.state.ponto, this.state.endereco, this.state.numero, this.state.complemento, this.state.bairro,
                this.state.cidade, this.state.placeId, this.state.estado, this.state.cep, this.state.lat,
                this.state.lng, this.state.opcaoRetirarDescricao, this.state.tipoEntrega, this.state.notificacaoSmsEmail)
        }
        if (this.state.numero !== 0) {
            this.map.forceUpdate();
        }
    }

    editPoint(id, endereco, numero, complemento, bairro, cidade, placeId, estado, cep, lat, lng, opcaoRetirarDescricao, tipoEntrega, notificacaoSmsEmail) {
        let editPontos = this.state.pontos.slice()

        var point = {
            ponto: id,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            placeId: placeId,
            estado: estado,
            cep: cep,
            lat: lat,
            lng: lng,
            opcaoRetirarDescricao: opcaoRetirarDescricao,
            tipoEntrega: tipoEntrega,
            notificacaoSmsEmail: notificacaoSmsEmail
        }
        editPontos.splice(id, 1, point)
        this.setState({ pontos: editPontos })

        this.getQuotation();
    }

    handleChangeFlagEdit = (pontoAtual) => {
        this.setState({ ponto: pontoAtual }, this.setState({ flag: 'edit' }))
        var pontoEdicao = this.state.pontos[pontoAtual]

        this.setState({
            endereco: pontoEdicao.endereco, numero: pontoEdicao.numero, complemento: pontoEdicao.complemento, lat: pontoEdicao.lat, lng: pontoEdicao.lng,
            bairro: pontoEdicao.bairro, cidade: pontoEdicao.cidade, placeId: pontoEdicao.placeId, estado: pontoEdicao.estado,
            cep: pontoEdicao.cep, tipoEntrega: pontoEdicao.tipoEntrega, notificacaoSmsEmail: pontoEdicao.notificacaoSmsEmail
        })

        this.setState({ changeComponent: 1 });
    }

    handleChangeFlagEstado = () => {
        this.setState({ flagEstado: 'done' })
    }

    handleChangeEndereco(endereco, lat, lng, numero, bairro, cidade, placeID, estado, cep) {

        console.log(bairro);
        console.log(cidade);
        console.log(placeID);

        this.setState(({
            lat: lat,
            lng: lng,
            showMarker: true,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            placeId: placeID,
            estado: estado,
            cep: cep


        }), () => this.addPonto())

        this.getQuotation();

    }

    handleChangeComplemento = (e) => {
        this.setState({ ...this.state, complemento: e.target.value })
    }

    handleChangeTeste(testeFinal) {
        this.setState({
            acao: testeFinal
        })
    }

    handleClickButtonClearState = (proximoPonto) => {
        this.setState({
            flag: 'include',
            flagEstado: 'progress',
            endereco: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            placeId: "",
            estado: "",
            cep: "",
            opcaoRetirarDescricao: "",
            tipoEntrega: "",
            notificacaoSmsEmail: "",
            ponto: proximoPonto
        })
    }

    handleClickButtonAddWorkOrder = () => {
        this.addWorkOrder()
        this.setState({
            pontos: []
        })
    }

    setOpcao = (ponto, descricao) => {
        this.setState({ opcaoRetirarDescricao: descricao })
        let editPontos = this.state.pontos.slice()

        var point = {
            ponto: ponto,
            endereco: this.state.endereco,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            placeId: this.state.placeId,
            estado: this.state.estado,
            cep: this.state.cep,
            lat: this.state.lat,
            lng: this.state.lng,
            opcaoRetirarDescricao: descricao,
            tipoEntrega: this.state.tipoEntrega,
            notificacaoSmsEmail: this.state.notificacaoSmsEmail
        }
        editPontos.splice(ponto, 1, point)
        this.setState({ pontos: editPontos })
    }

    buildHelpieQuotation = () => {
        var order = this.buildHelpieDeliveryOrder()
        return {
            skillId: 711,
            deliveryDetails: order
        }
    }

    buildHelpieDeliveryOrder = () => {
        console.log(this.state)
        return {
            points:
                this.state.pontos.map(ponto => {
                    return {
                        address1: ponto.endereco,
                        address2: ponto.complemento,
                        addressNumber: ponto.numero,
                        city: ponto.cidade,
                        lat: ponto.lat,
                        lng: ponto.lng,
                        neighborhood: ponto.bairro,
                        placeId: ponto.placeId,
                        sequence: ponto.ponto+1,
                        state: ponto.estado,
                        zipCode: ponto.cep,
                        action: ponto.tipoEntrega,
                        instructions: ponto.opcaoRetirarDescricao
                    }
                }
                ),
            quotation: this.state.deliveryQuotation,
            quotationSelectedId: this.state.quotationId,
            quotationSelectedDetailId: this.state.quotationDetailId,

        }
    }

    saveHelpie = () => {
        this.setState({ loadingQuotation: true })
        ApiHelpies.addHelpieQuotation(this.buildHelpieQuotation(), (response) => {
            console.log(response.id)
            this.setState({ helpieQuotationId: response.id }, () => HelpieUtil.setNewHelpieInfo(this.state))
        }, (error) => {
            console.log(error)
            this.setState({ msgError: error, loadingQuotation: false })
        })
    }

    notificarSmsOuEmail = (ponto, sms) => {
        this.setState({ notificacaoSmsEmail: sms })
        this.editPoint(ponto, this.state.endereco, this.state.numero,
            this.state.complemento, this.state.bairro, this.state.cidade, this.state.placeId, this.state.estado,
            this.state.cep, this.state.lat, this.state.lng, this.state.opcaoRetirarDescricao, this.state.tipoEntrega, sms)
    }

    setOtimizaRota = (state) => {
        console.log(state)
        this.setState({ otimizaRota: state })
    }

    setTipoEntrega = (tipo) => {
        this.setState({ tipoEntrega: tipo })
    }

    changeComponent = (proximoPonto) => {
        if (this.state.changeComponent === 1) {
            this.setState({ changeComponent: 2 });
        } else if (this.state.changeComponent === 2) {
            this.handleChangeFlagEstado();
            this.setState({ changeComponent: 3 });
        } else if (this.state.changeComponent === 3) {
            this.handleClickButtonClearState(proximoPonto);
            this.setState({ changeComponent: 1, numero: '' });
        }

    }

    cleanArrayPoints = () => {
        this.setState({
            pontos: []
        })
    }

    render() {
        var componentStep;
        var route;
        // var routeDetail;


        if (this.state.helpieQuotationId != null) {
            return <Redirect push to={{
                pathname: '/app/cadastro',
                quotationData: this.state
            }} />
        }

        if (this.state.changeComponent === 2) {
            componentStep = <PointDetail
                pontos={this.state.pontos}
                pontoAtual={this.state.ponto}
                price={this.state.price}
                distance={this.state.distance}
                time={this.state.time}
                descricao={this.state.opcaoRetirarDescricao}
                descricaoFunction={this.setOpcao}
                smsEmail={this.state.notificacaoSmsEmail}
                smsEmailFunction={this.notificarSmsOuEmail}
                // mudaFlag={this.handleChangeFlagEdit}
                mudaFlagEstado={this.handleChangeFlagEstado}
                flagEstado={this.state.flagEstado}
                flag={this.state.flag}
                excluiPonto={this.handleDeleteEndereco}
                isValidated={this.state.isValidated}
                validadorCampos={this.validadorCampos}
                onClick={this.props.includePonto}
                tipoEntrega={this.state.tipoEntrega}
                setTipoEntrega={this.setTipoEntrega}
            />;

            if (!this.state.opcaoRetirarDescricao) {

                route = <button type="button" className="btn btn-primary" disabled={!this.state.opcaoRetirarDescricao}>Próximo</button>
            } else {
                route = <button type="button" className="btn btn-primary" onClick={this.changeComponent}>Próximo</button>
            }

        } else if (this.state.changeComponent === 1) {
            componentStep = <Point
                handleValue={this.state.endereco}
                pontos={this.state.pontos}
                handleValueComplemento={this.state.complemento}
                handleChangeEndereco={this.handleChangeEndereco}
                handleChangeComplemento={this.handleChangeComplemento}
                ponto={this.state.ponto}
                includePonto={this.addPonto}
                handleClickButton={this.handleClickButtonAddPonto}
                price={this.state.price}
                distance={this.state.distance}
                time={this.state.time}
                number={this.state.numero}
                flagEstado={this.state.flagEstado}
                getQuotation={this.getQuotation}
                pontoAtual={this.state.ponto}

            />;

            if (this.state.numero || this.state.flagEstado === 'done') {
                route = <button type="button" className="btn btn-primary" onClick={this.changeComponent}>Próximo</button>

            } else {
                route = <button type="button" className="btn btn-primary" disabled={!this.state.numero}>Próximo</button>

            }
        } else if (this.state.changeComponent === 3) {
            componentStep = <Points
                pontos={this.state.pontos}
                handleClickButton={this.handleClickButtonClearState}
                handleClickButtonAddWorkOrder={this.handleClickButtonAddWorkOrder}
                mudaFlag={this.handleChangeFlagEdit}
                excluiPonto={this.handleDeleteEndereco}
                price={this.state.price}
                distance={this.state.distance}
                time={this.state.time}
                otimizaRota={this.state.otimizaRota}
                setOtimizaRota={this.setOtimizaRota}
                changeComponent={this.changeComponent}
                tipoEntrega={this.state.tipoEntrega}
                setTipoEntrega={this.setTipoEntrega}
            />;

            if (this.state.pontos.length <= 1) {
                route = <button type="button" className="btn btn-primary" disabled={this.state.pontos.length <= 1}>Finalizar</button>

            } else {
                //route = <Link to='/cadastro' className="btn btn-primary">Finalizar</Link>

                route = <button onClick={this.saveHelpie} type="button" className="btn btn-primary" disabled={this.state.loadingQuotation}>
                    {this.state.loadingQuotation ?
                        <div className='sweet-loading pt-1'>
                            <ClipLoader
                                color={'#D3DBDA'}
                                size={35}
                                loading={this.state.loadingQuotation}
                            />
                        </div> : "Finalizar"}
                </button>
            }
        }

        if (this.state.msgError !== '') {
            var messageError = <Error message='Falha no envio, tente mais tarde.' />
        }

        return (
            /* Novo HTML */
            <div className="helper">
                {/*Including meta tags for Open Graph*/}
                {/* <MetaTags>
                    <title>Conheça {helperData.helperName}. {this.state.primarySkill} próximo da sua região.</title>
                    <meta name="description" content={"Com o Helpie você encontra o melhor " + this.state.primarySkill + ", recebe orçamentos, contrata e paga com cartão de crédito."} />
                    <meta property="og:title" content={"Conheça " + helperData.helperName + ". " + this.state.primarySkill + " próximo da sua região."} />
                    <meta property="og:image" content={helperData.profilePicturePath} />
                </MetaTags> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 ml-sm-auto col-lg-5 p-0 pt-5 pedido">
                            {componentStep}
                            <div className="pb-2 px-5 my-5">
                                {route}
                            </div>
                            <div className="offset-lg-3 pl-5 pt-3">
                                {messageError}
                            </div>
                        </div>
                        <div className="col-md-9 col-lg-5 p-0">
                            <Map ref={(x) => { this.map = x; }} lat={this.state.lat} lng={this.state.lng} pontos={this.state.pontos} showMarker={this.state.showMarker} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Delivery;
