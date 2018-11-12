import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './Registration.css';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';


class RegisterName extends Component {

    validateName = (nome, sobrenome) => {
        // true means invalid, so our conditions got reversed
        return {
            nome: nome.length === 0,
            sobrenome: sobrenome.length === 0,
        };
    }


    render() {

        const errors = this.validateName(this.props.nome, this.props.sobrenome);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        // console.log(this.props.quotationData);
        

        return (
            <div className="col-md-12 col-lg-12 pt-5">
                <div className="row">
                    <div className="form-group offset-lg-2 col-md-4 col-lg-4">
                        <label htmlFor="InputName1" className="formText">Nome</label>
                        <input type="text" className="form-control input-field" id="name" value={this.props.nome} onChange={this.props.setNome} aria-describedby="nameHelp1" name="firstName" placeholder='digite...' />
                    </div>
                    <div className="form-group col-md-4 col-lg-4">
                        <label htmlFor="InputName2## Heading ##" className="formText">Sobrenome</label>
                        <input type="text" className="form-control input-field" id="name" value={this.props.sobrenome} onChange={this.props.setSobrenome} aria-describedby="nameHelp2" name="lastName" placeholder='digite...' />
                    </div>
                </div>
                    <div className="row">
                        <div className="offset-lg-2 col-lg-8 pt-4 mt-4">
                            <Link to={{ pathname: '/app/login', quotationData: this.props.quotationData }} type="text"  className="col-md-3 btn pl-0 mr-2 link-entrar">Já tem cadastro? Entrar</Link>
                            <button type="button" className="col-md-6 btn btn-primary" onClick={this.props.changeComponent} disabled={isDisabled}>Próximo</button>
                        </div>
                    </div>
                </div>

        );
    }
}

export default RegisterName;