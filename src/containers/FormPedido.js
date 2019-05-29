import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import api from '../components/Api.js';

class FormPedido extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  mySubmitHandler = (event) => {
    // event.preventDefault();
    // alert("You are submitting " + this.state.username);

    // Enviar a ruta /crearPedido con campos de PedidoView
  }

  // myChangeHandler = (event) => {
  //   this.setState({username: event.target.value});
  // }
  render() {

    return(
      <form onSubmit={this.mySubmitHandler}>
          <h1>Hello {this.state.username}</h1>
          <label>N° de Pedido</label>
          <input type='text' name='numeroPedido'/>
          <br/><br/>
          <label>N° de Cliente</label>
          <input type='text' name='numeroCliente'/>
          <br/><br/>
          <label>Fecha</label>
          <input type='text' name='fechaPedido'/>
          <br/><br/>
          <label>N° de Pedido</label>
          <input type='text' name='estadoPedido'/>
          <br/><br/>
          <input type='submit'/>
      </form>
    );
  }
}

export default FormPedido;
