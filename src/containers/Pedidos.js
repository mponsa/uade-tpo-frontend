import React, { Component , Fragment} from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Table, Button} from 'react-bootstrap';
import Routes from "../Routes.js";
import { Link, withRouter } from "react-router-dom";

class Pedidos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'isLoaded': true, // 'isLoaded': false
            'Pedidos': [] };
      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/pedidos').then(response =>{
                if (response.data.errorCode == 0){
                    this.setState({
                        isLoaded : true,
                        Pedidos : response.data.result})
                   }else{
                        alert(response.data.clientMessage)
                  }
            })
          }
          catch(e) {
              alert(e);
          }
        }


      render(){
        const Pedidos = this.state.Pedidos;

        if (this.state.isLoaded){
          return(
              <div>
                  <br/>
                  <Button variant="primary" action href="/nuevoPedido">Nuevo Pedido</Button>
                  <br/><br/>
                  <Table>
                      <thead>
                          <th>#</th>
                          <th>N° de Pedido</th>
                          <th>N° de Cliente</th>
                          <th>Fecha</th>
                          <th>estado</th>
                      </thead>
                      <tbody>
                          {Pedidos.map(pedido => (

                                <tr>
                                    <td>{pedido.numeroPedido}</td>
                                    <td>{pedido.numeroCliente}</td>
                                    <td>{pedido.fechaPedido}</td>
                                    <td>{pedido.estadoPedido}</td>
                                </tr>

                          ))}
                      </tbody>
                  </Table>
              </div>
            );
        }
        else{
              return(<div>Cargando</div>);
        }
      }
}
export default Pedidos;
