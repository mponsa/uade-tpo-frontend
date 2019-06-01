import React from "react";
import { Modal, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import api from '../components/Api.js';

class ChgPass extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          usuario: "",
          password: ""
        };
      }
    
        
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    handleChangePassword = event => {
        event.preventDefault();
            try{
                axios.post(api.path + '/cambioPassword',{
                'usuario': this.state.usuario,
                'password': this.state.password
              }).then(response => {
                  alert(response.data.clientMessage)
                  this.props.onHide()
              })  
            }
            catch(e){
              alert(e.message)
            }
    }         
    
    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cambiar password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
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
                onClick = {this.handleChangePassword} >
              Change Password
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
export default ChgPass;