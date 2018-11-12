import React, { Component } from 'react';
import iphone_app_helpie from '../../Images/iPhone-app-Helpie.png'
import './AboutHelpie.css';


class AboutHelpie extends Component {

    render() {
        return (    
            <div id="sc_abouthelpie">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={iphone_app_helpie}  title="App Helpie" alt="App Helpie" className="mb-3" />
                        </div>
                        <div className="col-md-8 align-self-center">
                            <h4>Sobre o Helpie!</h4>
                            <strong>HELPIE</strong> é o aplicativo de celular onde clientes e profissionais se conectam e negociam qualquer tipo de serviço. Diga o que precisa e o HELPIE cuida do resto pra você!
                            <div className="w-100 mb-5"></div>
                            <div className="btn-about-helpie">
                                <a href="https://www.helpie.com.br" alt="Página Inicial" rel="noopener noreferrer">
                                    Saiba Mais <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                </a>
                            </div>                            
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default AboutHelpie;