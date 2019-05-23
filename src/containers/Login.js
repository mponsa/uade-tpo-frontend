import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";
import api from '../components/Api.js';



class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        usuario: "",
        password: ""
      };
    }
    
    validateForm() {
      return this.state.usuario.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
          try{
              axios.post(api.path + '/login',{
              'usuario': this.state.usuario,
              'password': this.state.password
            }).then(response => {
               if (response.data.errorCode == 0){
                 this.props.userHasAuthenticated(true);
                  // Acá tendriamos que hacer el SET de la cookie LoggedIn a "true"
                  window.localStorage.setItem("loggedin",true)

                }else{
                alert(response.data.clientMessage)
               }  
            })  
          }
          catch(e){
            alert(e.message)
          }
     }         
      
    render() {
        return (
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="usuario" bsSize="large">
              <FormLabel>Usuario</FormLabel>
              <FormControl
                autoFocus
                type = "text"
                value={this.state.usuario}
                placeholder="Usuario"
                onChange={this.handleChange}
              />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        );
    }
}
export default Login;
