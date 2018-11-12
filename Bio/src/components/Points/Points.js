import React, { Component } from 'react';
import Quotation from '../Quotation/Quotation';
import './Points.css';
import NumberUtil from '../../util/NumberUtil';

class Points extends Component {

    constructor(props){
        super(props)
        this.state = {
            checked: this.props.otimizaRota
            
        }
    }

    setOtimizarRota = (evento) => {


        // this.setState({ otimizaRota: evento.target.otimizaRota });

        // console.log(this.refs.otimizar.state.checked); // Never gets logged

        // this.setState({
        //     rotaOtimizada: this.refs.otimizar.state.checked 
        // });

        // console.log(this.props.otimizaRota); // Never gets logged

        this.setState({checked: !this.state.checked});

        this.props.setOtimizaRota(this.state.checked)        

      }
    
    render() {
        var proximoPonto = 1
        if(this.props.pontos != null) {
            proximoPonto =  this.props.pontos.length
        }

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

             
             
        return (
            <div className="px-5 pt-5">
                <div>
                    <h1 className="h4 text-secondary pointTitle">Percurso</h1>
                </div>
                <div className="no-gutter col-xs-12">
                    <div className="divider"></div>
                </div>
                {/* <div className="no-gutter col-xs-12 pt-4">
                
                <input type="checkbox" onChange={this.setOtimizarRota} defaultChecked={this.state.checked}/>
                <span> Otimizar Rota: </span>
                
                    
                </div> */}

                {this.props.pontos.map((item, i) =>
                    <div className="pt-3" key={i}>
                        <div className="point pb-3">
                            <span className="badge badge-secondary badge-logX">{i + 1}</span>
                            <span className="retirada">{'Ponto ('+ item.tipoEntrega + ')' }</span>
                            <div>
                                <label className="address pt-1">{item.endereco}</label>
                                <label className="address pt-1">{item.complemento}</label>
                                <label className="address pt-1">{item.opcaoRetirarDescricao}</label>
                                <span onClick={() => this.props.mudaFlag(i) } className="changeAddress hyperlink">alterar</span> |
                                <span onClick={() => this.props.excluiPonto(i) } className="changeAddress hyperlink"> excluir</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="point pr-2 pt-3 pb-3">
                    <span className="badge badge-secondary badge-logX">{proximoPonto + 1}</span> <span className="retirada">
                        <span className="hyperlink" onClick={() => this.props.changeComponent(proximoPonto)}>Adicionar destino de entrega</span>
                    </span>
                </div>
                <div className="w-100"></div>
                <div className="footer">
                    <div className="col-xs-12">
                        {quotation}
                    </div>
                    {/* <Link to="/history" onClick={this.props.handleClickButtonAddWorkOrder} className="btn btn-primary">Finalizar</Link> */}
                </div>
            </div>
        );
    }
}

export default Points;