import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import LongText from './componentes/LongText';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import data from './landingPages.json';

class App extends Component {

  constructor(){
    super();
    this.state = {lista : [], jsonData: []};

  }

  componentDidMount(){

    if (window.location.href.indexOf("sp") > -1) {


      var localEstado = 'sp';
      var latLng = "lat=-23.5895089&lng=-46.6848992";

    }else if (window.location.href.indexOf("rj") > -1) {

           localEstado = 'rj';
           latLng = "lat=-22.897594&lng=-43.178823";

    }else {

           latLng = "lat=-23.6247994&lng=-46.7063898";
    }

      // axios.get('/landingPages.json')
      // .then(response => {
        // console.log(window.location.hostname);
        // this.setState({jsonData:response.data});


    var landingPages = data.map(function(lp){
                                  return lp;
                            });

    var scanUrls =  landingPages.filter(function (lp) {

      return lp.name === window.location.pathname;

    });


    if (scanUrls !== 'undefined' && scanUrls.length > 0) {
      var hashCode = scanUrls[0].hash;
    }else {
      hashCode = 'MzkxNTdkZTctOTUyZi00MmFhLTkzOTOtNWt1MTI1YjMzZjE1';
    }

    axios.get('https://api-public.helpie.com.br/1/skills/' + hashCode +  '/helpers/top15?' + latLng + '&radius=30')

    .then(response => {
      console.log(response);
      this.setState({lista:response.data});
      console.log(this.state.lista);
    })

  // })
      .catch((error)=>{
        console.log('Ops, o Conteudo não pôde ser carregado!');
      })
  }

  setRating(rate){

    console.log(rate);

    if(rate !== -1){
      return <Rater interactive={false} rating={rate} />;
    }else{
      return <p className="sem-avaliacao">Sem Avaliação</p>;
    }
  }


  render() {

    const listItems = this.state.lista.slice(0, 8).map((user) =>

    <div className="rectangule" key={user.id}>
    <p>
    <img className="helper-image" alt="Imagem de perfil do Helper" src={user.profilePicturePath}>
    </img>
    </p>
    <p className="helper-name">{user.helperName}</p>
    <div className="rating">
    {/*<span><img className="rating-star" src="https://www.educationperfect.com/certification/Star2.jpg"></img></span>*/}
    {this.setRating(user.avgRating)}
    {/*<span className="helper-text">{user.avgRating}</span>*/}
    {/*<span className="helper-recomendation">11 recomendações</span>*/}
    </div>
    <div className="helper-bio">
    {/*<h4>BIO</h4>*/}
    <LongText value={user.bio}/>
    </div>
    {/* <a href="http://app.helpie.link" className="app-button">CHAMAR PELO APP<img src='/img/iphone-icon.png' /></a>*/}
    <a href={"https://web.helpie.com.br/helpers/" + user.hash} className="app-button">VER PERFIL<i className="fa-user-circle-o" /></a>
    </div>
  );

  return (
    <div id="wrapper">
    <div className="container">
    <span>{listItems}</span>
    </div>
    </div>
  );
}
}

export default App;
