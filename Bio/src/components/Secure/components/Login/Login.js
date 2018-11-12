import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiInternalUsers from '../../api/ApiInternalUsers';
import BaseComponent from '../Base/BaseComponent';
import SecurityUtil from '../../util/SecurityUtil';
import AuthUtil from '../../util/AuthUtil';
import CustomAlert from '../Alert/CustomAlert';

class Login extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      login: "",
      pass: "",
      showError: false,
      errorMessage: "oi"
    }
  }

  onClickLogin = (e) => {
    e.preventDefault()
    ApiInternalUsers.doUserLogin(this.state.login, SecurityUtil.sha256(this.state.pass), this.onLoginSuccess, this.onLoginError)
  }

  onLoginSuccess = (data) => {
    AuthUtil.setToken(data.token)
    window.location = "/Dashboard"
  }

  onLoginError = (error) => {
    super.log(error.message)
    this.setState({showError: true, errorMessage: error.message})
  }

  updateInputValue = (e) => {
    if (e.target.id === "login") {
      this.setState({
        login: e.target.value
      });
    } else if (e.target.id === "pass") {
      this.setState({
        pass: e.target.value
      });
    }
  }
  render() {
    return (
      <div>
      <Form style={{ maxWidth: "400px" }}>
        <FormGroup>
          <Label for="login" hidden>Login</Label>
          <Input type="text" name="login" id="login" placeholder="Login" onChange={this.updateInputValue} />
        </FormGroup>
        <FormGroup>
          <Label for="pass" hidden>Senha</Label>
          <Input type="password" name="password" id="pass" placeholder="Senha" onChange={this.updateInputValue} />
        </FormGroup>

        <Button onClick={this.onClickLogin}>Entrar</Button>
        <a href="/"><span> Esqueceu sua senha? </span> </a>
      </Form>
      <CustomAlert visible={this.state.showError} color="danger" message={this.state.errorMessage} onDismiss={() => this.setState({showError: false})}  />
      </div>
    )
  }

}

export default Login