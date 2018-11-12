import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import MenuLateral from './../Menu/Menu';
import Home from './../Home/Home';
import './Logado.css';
import Requests from '../../Requests/Requests';
import Profile from '../../Profile/Profile';
import AuthUtil from '../../../util/AuthUtil';
import Notifications from '../../Notifications/Notifications';
import Payments from '../../Payments/Payments';

class Logado extends Component {

    constructor(props) {
        super(props)
        var userInfo = {}
        if(props.location && props.location.userInfo){
          userInfo = props.location.userInfo
        } else {
          userInfo = AuthUtil.getUserInfo()
        }
        this.state = {userInfo:  userInfo};
    }

   
    render() {
        return (
            <div className="logado">
            <Container fluid={true}>
              <Row>
                <Col md="12" />
              </Row>
            </Container>
            <Container fluid={true}>
              <Row className="show-grid">
                <Col xs={4} md={2} className="menu-logado">
                  <MenuLateral userInfo={this.state.userInfo}/>
                </Col>
                <Col xs={12} md={10} className="main-login">
                  <Switch>
                    <Route exact path="/app/" component={Home} />
                    <Route exact path="/app/home" component={Home} />
                    <Route exact path="/app/solicitacoes" component={Requests} />
                    <Route exact path="/app/pagamentos" component={Payments} />
                    <Route exact path="/app/perfil" component={Profile} />
                    <Route exact path="/app/notificacoes" component={Notifications} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}

export default Logado;