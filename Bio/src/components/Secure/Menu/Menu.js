import React, { Component } from 'react';
import MenuItem from './MenuItem/MenuItem';
import UserInfo from './UserInfo/UserInfo';
import { ListGroup, ListGroupItem } from 'reactstrap';
import AuthUtil from '../../../util/AuthUtil';
import './Menu.css';

class Menu extends Component {

    render() {
        var user = this.props.userInfo
        return (
            <div style={{ margin: "auto" }}>
                <ListGroup>
                    <ListGroupItem>
                        <UserInfo name={user.firstName + ' ' + user.lastName} imageUrl={user.profilePicturePath} />
                    </ListGroupItem>
                    <MenuItem icon="add" text="Nova solicitação" customClass="nova-solicitacao" url="/app/entregas" />
                    <MenuItem icon="list" text="Solicitações" url="/app/solicitacoes" />
                    <MenuItem icon="attach_money" text="Pagamentos" url="/app/pagamentos" />
                    <MenuItem icon="notifications_active" text="Notificações" url="/app/notificacoes" />
                    <MenuItem icon="person" text="Perfil" url="/app/perfil" />
                    <MenuItem icon="exit_to_app" text="Sair" url="/app/login" onClick={AuthUtil.logoutUser} />
                    <MenuItem icon="open_in_browser" text="Ir para o site" customClass="last-item" url="https://www.helpie.com.br" target="_blank" />
                </ListGroup>
            </div>
        )

    }
}


export default Menu