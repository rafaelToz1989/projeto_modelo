import React, { Component } from 'react';
import '../Registration/Registration.css';
import ValidationUtil from '../../util/ValidationUtil';
import LocalizationUtil from '../../util/LocalizationUtil';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';



class RegisterEmail extends Component {

    constructor() {
        super()
        this.state = {
            valid: false,
            errorWarning: "",
            existsEmail: false
        }

       
        
    }

    componentDidMount() {
        if (this.props.email) {
            this.validateAndStore(this.props.email)
        }

        if (this.props.errorMsg !== 'KEY_USER_ALREADY_EXISTS') {
            this.setState({errorWarning: LocalizationUtil.KEY_INPUT_VALID_EMAIL})
        }else{
            this.setState({errorWarning: LocalizationUtil.KEY_INPUT_NOT_EXISTS_EMAIL, existsEmail: true}) 
        }
    }


    handleChangeEmail = (e) => {
        const email = e.target.value;
        this.validateAndStore(email);

    }
    validateAndStore = (email) => {
        const emailValid = ValidationUtil.validateEmail(email)

        this.setState({ valid: emailValid, existsEmail: false, errorWarning: LocalizationUtil.KEY_INPUT_VALID_EMAIL})

        this.props.setEmail(email)

    }

    render() {

        let fieldContainerClass;

    


        if (!this.state.valid || this.state.existsEmail) {
            fieldContainerClass = 'span-message'
        } else {
            fieldContainerClass = 'field-container'
        }



        return (
            <div className="col-md-12 col-lg-12 pt-5">
                <div className="row">
                    <div className="form-group offset-lg-2 col-md-8 col-lg-8">
                        <label htmlFor="InputName1">Email</label>
                        <input type="email" className="form-control input-field" id="email" value={this.props.email} onChange={this.handleChangeEmail} aria-describedby="emailhelpie" name="email" placeholder='digite...' />
                        <span className={fieldContainerClass}>{this.state.errorWarning}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8 pt-4 mt-4">
                        <button type="button" className="col-md-3 btn btn-outline-info mr-3" onClick={this.props.passoAnterior}>Anterior</button>
                        <button type="button" className="col-md-6 btn btn-primary" onClick={this.props.changeComponent} disabled={!this.state.valid || this.state.existsEmail}>Próximo</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterEmail;