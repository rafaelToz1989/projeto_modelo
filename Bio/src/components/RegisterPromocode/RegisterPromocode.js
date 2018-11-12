import React, { Component } from 'react';
import '../Registration/Registration.css';
import { ClipLoader } from 'react-spinners';
// import Map from '../Map/Map';
// import RegisterName from '../RegisterName/RegisterName';
// import RegisterEmail from '../RegisterEmail/RegisterEmail';



class RegisterPromocode extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
        }
    }

    turnOffLoading = () =>{
        this.setState({ loading: false });
    }

    loadingAccess = (e) => {

        e.preventDefault()

        this.setState({ loading: true });

        this.props.doRegister(e);
    }

    render() {

        return (

            <div className="col-md-12 col-lg-12 pt-5">
                <label htmlFor="InputName1" className="row justify-content-center align-items-center">Se você tem um código de convite, pode inserí-lo aqui:</label>
                <form onSubmit={this.loadingAccess}>
                    <div className="row">
                        <div className="form-group offset-lg-4 col-md-4 col-lg-4">
                            {/* <label htmlFor="InputName1" className="row justify-content-center align-items-center">Se você tem um cupom promocional, pode inserí-lo:</label> */}
                            <input type="text" className="form-control cupom-promocional" id="promocode" value={this.props.promocode} onChange={this.props.setPromocode} aria-describedby="promocodeHelp1" name="promocode" placeholder='Cupom promocional (opcional):' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-lg-3 col-lg-8 pb-5 mt-5">
                            <button type="button" className="col-md-3 btn btn-outline-info mr-3" onClick={this.props.passoAnterior}>Anterior</button>
                            <button type="submit" className="col-md-6 btn btn-primary">{this.state.loading ?
                                    <div className='sweet-loading pt-1'>
                                        <ClipLoader
                                            color={'#D3DBDA'}
                                            size={35}
                                            loading={this.state.loading}
                                        />
                                    </div> : "Fazer sua primeira entrega"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterPromocode;