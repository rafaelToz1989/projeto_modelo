import React, { Component } from 'react';
import '../Registration/Registration.css';
import ValidationUtil from '../../util/ValidationUtil';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';


class RegisterPassword extends Component {

    constructor() {
        super()
        this.state = {
            valid: false,
        }
    }

    componentDidMount() {
        if (this.props.password) {
            this.validateAndStore(this.props.password);
        }
    }

    handleChangePassword = (e) => {

        const pass = e.target.value
        this.validateAndStore(pass);
    }

    validateAndStore = (pass) => {
        const passValid = ValidationUtil.validatePassword(pass)
        this.setState({ valid: passValid })

        this.props.setPassword(pass)
    }


    render() {

        let fieldContainerClass;

        const valid = this.state.valid


        if (!valid) {
            fieldContainerClass = 'field-container.error, span-message'
        } else {
            fieldContainerClass = 'field-container'
        }


        return (
            <div className="col-md-12 col-lg-12 pt-5">
                <div className="row">
                    <div className="form-group offset-lg-2 col-md-8 col-lg-8">
                        <label htmlFor="InputName1">Senha</label>
                        <input type="password" className="form-control input-field" id="password" value={this.props.password} onChange={this.handleChangePassword} aria-describedby="passwordhelpie" name="password" placeholder='digite...' />
                        <span className={fieldContainerClass}>A senha deve conter números, letras e ter mais de 6 caracteres.</span>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8 pt-4 mt-4">
                        <button type="button" className="col-md-3 btn btn-outline-info mr-3" onClick={this.props.passoAnterior}>Anterior</button>
                        <button type="button" className="col-md-6 btn btn-primary" onClick={this.props.changeComponent} disabled={!this.state.valid}>Próximo</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPassword;