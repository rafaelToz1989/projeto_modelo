import React, { Component } from 'react';
import google_play from '../../Images/baixar-no-google-play.png'
import app_store from '../../Images/baixar-na-app-store.png'
import promoCode from '../../Images/promo-code.png'
import './PromoCode.css';
// import {} from 'reactstrap';

class PromoCode extends Component {

    render() {
        return (    
            <div id="sc_promocode">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={promoCode}  title="Promo Code Helper" alt="Promo Code Helper" className="mb-3" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h4>GANHE R$30 DE DESCONTO!</h4>
                            Baixe agora mesmo o App HELPIE, aplique o código <strong>HELPIECHEGOU</strong> e ganhe R$30 de desconto!
                        </div>
                        <div className="col-md-3">
                            <a href="https://itunes.apple.com/br/app/helpie!/id1064927271?l=pt-br&mt=8" >
                                <img src={app_store} alt="Baixe na App Store" title="Loja Apple"/>
                            </a>
                            <div className="w-100 mb-5"></div>
                            <a href="https://play.google.com/store/apps/details?id=br.com.helpie.helpie" >
                                <img src={google_play} alt="Baixe no Google Play" title="Loja Android"/>
                            </a>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default PromoCode;