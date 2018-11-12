import React, { Component } from 'react';
// import PaymentsMethod from '../PaymentsMethod/PaymentsMethod';
import ApiUsers from '../../api/ApiUsers';
import AuthUtil from '../../util/AuthUtil';
import UserCreditCard from '../UserCreditCard/UserCreditCard';

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: AuthUtil.getUserInfo(),
            errorMsg: ""
        };
    }

    componentDidMount() {

        ApiUsers.getUsers((response) => {
            this.setState({ data: response })
        }, (error) => {
            this.setState({ errorMsg: error.message })
        })



    }

    render() {

        return (
            <div>
                <div className="container-fluid py-5">
                    <h1>Meus Dados</h1>
                    <div className="form-group pt-3">
                    <img className="imgProfile image-cropper-profileImg" alt="imagem de perfil" src={this.state.data.profilePicturePath} />
                        <h4 className="px-3">{this.state.data.firstName + " " + this.state.data.lastName}</h4>
                    </div>
                    <div className="row">
                        <div className="col align-self-center">
                            {/* <div className="form-group">
                               
                            </div> */}
                            <form>
                                <div className="form-group">
                                    <h5 className="px-3">{"Email: " + this.state.data.email}</h5>
                                </div>
                                <div className="form-group">
                                    <h5>{"Telefone: " + this.state.data.ddi + this.state.data.ddd + this.state.data.mobilePhone}</h5>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mb-5">
                    {/* <PaymentsMethod /> */}
                    <UserCreditCard />
                </div>
            </div>
        )
    }
}

export default Profile