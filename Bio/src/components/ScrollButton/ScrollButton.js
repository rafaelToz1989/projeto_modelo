import React, { Component } from 'react';
import './ScrollButton.css';

class ScrollButton extends Component {
    constructor() {
      super();
  
      this.state = {
          intervalId: 0
      };
    }

  componentDidMount() {
     document.getElementById("button-scroll").classList.add("hide-button");

     window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll(event){
  
  let scrollTop;

  if (window.pageYOffset < 600) {
      scrollTop = document.getElementById("button-scroll").classList.add("hide-button");
      } else{
      scrollTop = document.getElementById("button-scroll").classList.remove("hide-button");
     }

     return scrollTop;
}


    scrollStep() {
      
      if (window.pageYOffset === 0) {
          
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }
    
    render () {

        return <button title='Voltar ao topo' className='scroll' id='button-scroll' 
        onClick={ () => { this.scrollToTop(); }}>
         <i className="fa fa-angle-up arrow-up" ></i>
       </button>;
     }
  } 
  
  export default ScrollButton;