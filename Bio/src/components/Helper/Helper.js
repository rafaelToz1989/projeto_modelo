import React, { Component } from 'react';
import './Helper.css';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Bio from '../Bio/Bio'
import SkillList from '../SkillList/SkillList';
import PromoCode from '../PromoCode/PromoCode';
import MetaTags from 'react-meta-tags';
import AboutHelpie from '../AboutHelpie/AboutHelpie';
import ApiHelper from '../../api/ApiHelper';


class Helper extends Component {

    constructor(props) {
        super(props);
        this.state = { helperData: [], primarySkill: "" };
       
       
    }

    onGetHelperByHashSuccess = (response) => {
        this.setState({ helperData: response, primarySkill: response.skills[0].name });
        console.log(this.state.helperData);
    }

    onGetHelperByHashError = (error) => {
        console.log('Ops, o Conteudo não pôde ser carregado!');
    }

    componentDidMount() {
        ApiHelper.getHelperByHash(this.props.match.params.hash, this.onGetHelperByHashSuccess, this.onGetHelperByHashSuccess)
    }

    setRating(rate) {


        if (rate !== -1) {
            return <Rater interactive={false} rating={rate} />;
        } else {
            return <p className="sem-avaliacao">Sem Avaliação</p>;
        }
    }

    render() {

        const helperData = this.state.helperData

        return (
            /* Novo HTML */
            <div className="helper">
                {/*Including meta tags for Open Graph*/}

                <MetaTags>
                    <title>Conheça {helperData.helperName}. {this.state.primarySkill} próximo da sua região.</title>
                    <meta name="description" content={"Com o Helpie você encontra o melhor " + this.state.primarySkill + ", recebe orçamentos, contrata e paga com cartão de crédito."} />
                    <meta property="og:title" content={"Conheça " + helperData.helperName + ". " + this.state.primarySkill + " próximo da sua região."} />
                    <meta property="og:image" content={helperData.profilePicturePath} />
                </MetaTags>

                <div className="header-helper">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-sm-2">
                                <img className="img-helper mb-3" src={helperData.profilePicturePath} alt="Foto - perfil do Helper" />
                            </div>
                            <div className="col-md-auto">
                                <h1>{helperData.helperName}</h1>
                                <div className="rating rating-star">
                                    {this.setRating(helperData.avgRating) }
                                    {/*<span className="helper-recomendation">11 recomendações</span>*/}
                                    {/* <span className="helper-text">{helperData.avgRating}</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Bio bioText={this.state.helperData.bio} />
                        </div>
                        <div className="col-md-6">
                            <SkillList skillList={this.state.helperData.skills} />
                        </div>
                    </div>
                </div>

                <PromoCode />

                <AboutHelpie />

            </div>
        );
    }
}

export default Helper;
