import React, { Component } from 'react';
import './ModalBaixarApp.css';
import app_store from '../../Images/baixar-na-app-store.png'
import google_play from '../../Images/baixar-no-google-play.png'
import topo_iphone from '../../Images/topo-celular.png'
import button_iphone from '../../Images/botao-iphone.png'
import {Modal, ModalBody } from 'reactstrap';

class ModalBaixarApp extends Component {

    render() {
        return (    
            <div>
              <Modal isOpen={this.props.show} toggle={this.props.fnShowModal} className={this.props.className}>
                <a onClick={this.props.fnShowModal} style={{float:"right", margin: "auto", width: "100%"}}><span>Fechar <i className="fa fa-window-close" aria-hidden="true"></i> </span> </a> 
                <ModalBody className="modal-corpo">                  
                  <div className="inner-cellphone">
                    <img src={topo_iphone} title="Topo Celular" alt="Topo Celular"/>
                    <h4>Baixe o Helpie agora mesmo!</h4>
                    <a href="https://itunes.apple.com/br/app/helpie!/id1064927271?l=pt-br&mt=8" >
                      <img src={app_store} alt="Baixe na App Store" title="Loja Apple" />
                    </a>
                    <div className="w-100 mb-5"></div>
                    <a href="https://play.google.com/store/apps/details?id=br.com.helpie.helpie" >
                      <img src={google_play} alt="Baixe no Google Play" title="Loja Android" />
                    </a>
                    <div className="w-100 mb-5"></div>
                    <img src={button_iphone} title="Botão Celular" alt="Botão Celular" className="footer-cellphone" />
                  </div>                  
                </ModalBody>
              </Modal>
            </div>
        );
    }
}

export default ModalBaixarApp;