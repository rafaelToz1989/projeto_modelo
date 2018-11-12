import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import '../Registration/Registration.css';
import ValidationUtil from '../../util/ValidationUtil';
// import './Registration.css';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';



class RegisterCellphone extends Component {

    constructor() {
        super()
        this.state = {
            valid: false,
        }
    }

    componentDidMount() {
        if (this.props.celular) {
            this.validateAndStore(this.props.celular)
        }
    }


    handleChangeCelular = (event) => {
        const celular = event.target.value
        this.validateAndStore(celular)
    }

    validateAndStore = (celular) => {
        const celularValid = ValidationUtil.validateCelular(celular)
        this.setState({ valid: celularValid, celular: celular })
        this.props.setCelular(celular)
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
                        <label htmlFor="InputName1" className="formText">Celular</label>
                        <InputMask mask="(99)99999-9999" type="tel" className="form-control input-field" id="celphone"
                            value={this.props.celular} onChange={this.handleChangeCelular} aria-describedby="phonehelpie" name="celphone" placeholder='digite...' />
                        <span className={fieldContainerClass}>Digite um número válido</span>
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

export default RegisterCellphone;