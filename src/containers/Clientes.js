import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Table} from 'react-bootstrap';


class Clientes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            'isLoaded': false,
            'clientes': [] };
      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/clientes').then(response =>{
                if (response.data.errorCode == 0){    
                    this.setState({
                        isLoaded : true,
                        clientes : response.data.result})
                   }else{
                        alert(response.data.clientMessage)
                  }  
            })
          }
          catch(e) {
              alert(e);
          }
        }
      
       handleChange = e => {
         var input, filter, filtered;
         input = this.textInput.current
         filter = input.value.toUpperCase();
         

         filtered = this.state.clientes.filter(function(cliente){
             return !cliente.nombre.indexOf(filter)
         })
         
         this.setState({filtered : filtered})

         
      }

      handleCrearPedido = e => {
        this.setState({ 'cliente': this.state.clientes.find(cliente => cliente.numero == e.target.id),
                        'showCP':true})

      }

      

      handleMostrarPedidos = e => {
        this.setState({ 'cliente': this.state.clientes.find(cliente => cliente.numero == e.target.id),
                        'showVP':true});

      }

      render(){
        const clientes = this.state.clientes;  
        if (this.state.isLoaded){
        return(
            <div>
                <Table>
                    <thead>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cuil</th>
                        <th>Activo</th>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            
                              <tr>
                                  <td>{cliente.numero}</td>
                                  <td>{cliente.nombre}</td>
                                  <td>{cliente.cuil}</td>
                                  <td>{cliente.activo ? "Si" : "No"}</td>
                              </tr>  
                            
                        ))}
                    </tbody>
                </Table>
            </div>  
            
          )
    }
    else{
        return(<div>Cargando</div>)
    }
      };
}
export default Clientes;