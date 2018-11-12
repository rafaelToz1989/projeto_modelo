import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import ModalBaixarApp from './components/ModalBaixarApp/ModalBaixarApp';
import ScrollButton from './components/ScrollButton/ScrollButton';
import Helper from './components/Helper/Helper';
import Delivery from './components/Delivery/Delivery';
import Registration from './components/Registration/Registration';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Logado from './components/Secure/Logado/Logado';
import RecuperaAcesso from './components/RecuperaAcesso/RecuperaAcesso';


class App extends Component {

  constructor() {
    super();
    this.state = { showModalBaixarApp: false, secure: false, loggedIn: false };


  }

  showModal = () => {
    this.setState({
      showModalBaixarApp: !this.state.showModalBaixarApp
    });
  }


  render() {

    // window.onbeforeunload = function (e) {
    //   // return "Você realmente deseja fechar a página? informações digitadas não serão salvas!";
    //   // //if we return nothing here (just calling return;) then there will be no pop-up question at all
    //   // //return;
    //   var dialogText = 'Você realmente deseja fechar a página? informações digitadas não serão salvas!';
    //   e.returnValue = dialogText;
    //   return dialogText;

    // }



    return (
      /* Novo HTML */
      <div className="wrap-all">
        <Menu showModal={this.showModal} />
        <Switch>
          <Route exact path="/helpers/:hash" component={Helper} />
          <Route exact path="/app/entregas" component={Delivery} />
          <Route exact path="/app/cadastro" component={Registration} />
          <Route exact path="/app/login" component={Login} />
          <Route exact path="/app/esqueci" component={RecuperaAcesso}/>
          <Route path="/app" component={Logado} />
        </Switch>
        {/* <Prompt message={(params) => params.pathname !== '/entregas' ? "Move away?" : true} /> */}
        <Footer />
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
        <ModalBaixarApp show={this.state.showModalBaixarApp} fnShowModal={this.showModal} />
      </div>
    );
  }

}

export default App;
