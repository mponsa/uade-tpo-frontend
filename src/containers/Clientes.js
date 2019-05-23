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