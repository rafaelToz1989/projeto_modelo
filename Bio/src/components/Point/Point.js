import React, { Component } from 'react';
import Quotation from '../Quotation/Quotation';
import './Point.css';
import NumberUtil from '../../util/NumberUtil';

class Point extends Component {

    constructor(props) {
        super(props)

        var pontoAtual = props.pontos[props.ponto]
        
        if (pontoAtual != null) {
            var enderecoPonto = pontoAtual.endereco
            var complementoPonto = pontoAtual.complemento


        }

        this.state = {
            checked: this.props.otimizaRota,
            endereco: enderecoPonto,
            numero: '',
            bairro: '',
            cidade: '',
            ID: '',
            complemento: complementoPonto
        }

    }

    focusTextInput(address, number) {
        if (number === 0 && address.length > 0) {
            this.setState({ numero: '' })
            var pos = address.length
            address += ", numero"
            // this.inputPlacesGoogle.value = address

            var y = document.getElementById("warning-validation");

            y.style.display = "block";

            this.setState({ endereco: address }, () => this.selectNumber(this.inputPlacesGoogle, pos))
            //   this.autocomplete.props.inputProps.value = address
            //   this.selectNumber(this, pos)

        }
    }

    selectNumber(input, pos) {
        input.focus()
        console.log(input.value, pos, input.value.length)
        window.setTimeout(function () {
            input.setSelectionRange(pos + 2, pos + 8);
        }, 100);
        

    }

    handleChangeGoogle = (event) => {
        this.setState({ endereco: event.target.value })

    }

    setOtimizarRota = () => {


        // this.setState({ otimizaRota: evento.target.otimizaRota });

        // console.log(this.refs.otimizar.state.checked); // Never gets logged

        // this.setState({
        //     rotaOtimizada: this.refs.otimizar.state.checked 
        // });

        // console.log(this.props.otimizaRota); // Never gets logged

        this.setState({ checked: !this.state.checked });

        this.props.setOtimizaRota(this.state.checked)

    }

    componentDidMount() {

        var x = document.getElementById("warning-validation");

        x.style.display = "none";

        let inputNode = document.getElementById('input-autocomplete-places');
        let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
        autoComplete.setComponentRestrictions(
            { 'country': ['br'] });

        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace()
            console.log(place)
            var number = 0
            var address = ""
            var placeID = place.place_id
            var neighborhood = ""
            var city = ""
            var state = ""
            var zipCode = ""

            for (var i = 0; i < place.address_components.length; i++) {
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                    if (place.address_components[i].types[j] === "street_number") {
                        x.style.display = "none";
                        number = place.address_components[i].long_name
                        console.log(number);

                    } else if (place.address_components[i].types[j] === "route") {
                        address = place.address_components[i].short_name
                    }

                    if (place.address_components[i].types[j] === "sublocality_level_1") {
                        neighborhood = place.address_components[i].long_name
                    }

                    if (place.address_components[i].types[j] === "administrative_area_level_2") {
                        city = place.address_components[i].long_name
                    }

                    if (place.address_components[i].types[j] === "administrative_area_level_1") {
                        state = place.address_components[i].long_name
                        
                        
                    }

                    if (place.address_components[i].types[j] === "postal_code") {
                        zipCode = place.address_components[i].long_name
                    }
                }
            }

            this.setState({ numero: number})
            
            

            this.focusTextInput(address, number)
            inputNode.value = address
            let location = place.geometry.location
            this.props.handleChangeEndereco(
                place.formatted_address,
                location.lat(),
                location.lng(),
                number, 
                neighborhood,
                city,
                placeID,
                state,
                zipCode
            )

        });
    }

    render() {
        // var proximoPonto = 1
        // if (this.props.pontos != null) {
        //     proximoPonto = this.props.pontos.length
        // }

        const divStyle2 = {
            height: '21px',
            color: 'red',
            marginTop: '3px',

        };

        // var msg;
        // if (this.state.checked) {
        // msg = "checked";
        // } else {
        // msg = "unchecked";
        // }

        var price= this.props.price;
        var time= this.props.time;
        var distance= this.props.distance;
        var quotation = "";
 
             if ( price && time && distance ) {
                 quotation = <Quotation
                 price={NumberUtil.getDoubleAsCurrency(price)}
                 time={this.props.time}
                 distance={distance.replace(".", ',')}
             />;
             }

             

            //  let descricao;

            //  if (this.pontoAtual != null) {
            //     descricao = 'Ponto ' + (this.props.ponto + 2)
            //  }else{
            //     descricao = 'Ponto 1'
            //  }
            
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
                        <span className="badge badge-secondary badge-logX">{this.props.ponto + 1 + 'º'}</span> <span className="retirada"><span className="retirada">Ponto</span></span>
                    </div>
                    <div className="form-group pb-4">
                        <label>Endereço</label>
                        <input type="text" id="input-autocomplete-places" className="form-control" placeholder="Digite o endereço" defaultValue={this.state.endereco}
                            ref={(x) => { this.inputPlacesGoogle = x; }} value={this.state.endereco} onChange={this.handleChangeGoogle} />
                            <div id="warning-validation" className="mensagem-opcao-selecione" style={divStyle2}><span>Por favor, escolha um endereço com número</span></div>
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input onChange={this.props.handleChangeComplemento} defaultValue={this.state.complemento} type="text" className="form-control col-md-8" placeholder="Apt, bloco, etc"></input>
                    </div>
                    
                </div>
                <div className="w-100"></div>
                <div className="footer">
                    <div>
                        <div className="col-xs-12">
                        {quotation}
                        </div>
                        <div className="col-xs-12">
                            <div id="col-xs-12 map"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Point;