import React, { Component } from 'react';
import Quotation from '../Quotation/Quotation';

class Points extends Component {

    // constructor(props){
    //     super(props)
    //     // this.state = {
            
    //     // }
    // }

    
    render() {

    
        var price =this.props.quotationData.price;
        var time = this.props.quotationData.time;
        var distance = this.props.quotationData.distance;
        

        var quotation = "";
    
        if (price && time && distance) {
            quotation = <Quotation
                price={"R$" + price.replace(".", ',').toLocaleString('pt-BR')}
                time={time}
                distance={distance.replace(".", ',')}
            />;
        }

        return (
            <div className="px-5">
                <div>
                    <h1 className="h3 d-flex justify-content-center justify- pointTitle text-light">Dados do seu pedido</h1>
                </div>
                <div className="no-gutter col-xs-12">
                    <div className="divider"></div>
                </div>
                <div className="no-gutter col-xs-12 pt-4">
                
                {/* <span> Otimizar Rota: </span> */}
                
                     {/* <p>this box is {msg}.</p> */}
                
                </div>
                {this.props.quotationData.pontos.map((item, i) =>
                    <div className="pt-3" key={i}>
                        <div className="point pb-3" style={{ textAlign: 'left' }}>
                            <span className="badge badge-secondary badge-logX">{i + 1}</span>
                            <span className="retirada">Ponto </span>
                            <span>{"(" + item.tipoEntrega + ")"}</span>
                            <div>
                                <span className="address pt-2"><label>Descrição:</label>{" " + item.opcaoRetirarDescricao}</span>
                            </div>
                            <div>
                                
                                <span className="address pt-1"><label>Endereço: </label> {item.endereco}</span>
                                <span className="address">{item.complemento}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-100"></div>
                <div className="white-table">
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