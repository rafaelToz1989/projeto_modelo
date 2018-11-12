import React, { Component } from 'react';
import './Quotation.css';

class workOrderRequest extends Component {
    render() {
        return (
            <div className="col-xs-12">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 vague2">
                            <div className="col-xs-12 text-sm vague">
                                <strong className="vague3">Entregue em</strong>
                            </div>
                            <div className="col-xs-12 text-lg">
                                <strong className="vague3">{this.props.time}</strong>
                            </div>
                        </div>
                        <div className="col-md-4 vague2">
                            <div className="col-xs-12 text-sm vague">
                                <strong className="vague3">Distância</strong>
                            </div>
                            <div className="col-xs-12 text-lg">
                                <strong className="vague3">{this.props.distance}</strong>
                            </div>
                        </div>
                        <div className="col-md-4 vague2">
                            <div className="col-xs-12 text-sm vague">
                                <strong className="vague3">Total a pagar</strong>
                            </div>
                            <div className="col-xs-12 text-lg">
                                <strong className="vague3">{this.props.price}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default workOrderRequest;