import React, { Component } from 'react';
import './Menu.css';
import logo from '../../Images/logo-helpie.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';


class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false
          };
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      showModal = () =>{
        this.props.showModal() 
      }

    render() {
        return (    
        <div className="container-fluid navbar-helpie fixed-top">
                {/* <nav className="navbar navbar-expand-lg justify-content-between">
                    <a className="navbar-brand">
                        <img src={logo} alt="Helpie Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item baixar-app-popup">
                                <a href="#baixar-app-popup">BAIXE AGORA</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.helpie.com.br/nossos-servicos/">NOSSOS SERVIÇOS</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.helpie.com.br/helper/">OFEREÇA SEUS SERVIÇOS</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.helpie.com.br/blog-helpie/">BLOG HELPIE</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://helpie.zendesk.com/hc/pt-br">SUPORTE</a>
                            </li>
                        </ul>
                    </div>
                </nav> */}

            <Navbar color="white" light expand="md">
            <NavbarBrand href="https://www.helpie.com.br"> <img src={logo} alt="Helpie Logo" /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="baixar-app-popup" onClick={this.showModal}>Baixe agora</NavLink> 
                </NavItem>
                <NavItem>
                    <NavLink href="https://www.helpie.com.br/nossos-servicos/">Nossos Serviços</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://www.helpie.com.br/helper/">Ofereça seus Serviços</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://www.helpie.com.br/blog-helpie/">Blog Helpie</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://helpie.zendesk.com/hc/pt-br">Suporte</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default Menu;