import React, { Component } from "react";
import axios from 'axios';
import api from '../api.js';
import {Table} from 'react-bootstrap';


class Clientes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {'clientes': null};
      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/clientes').then(response =>{
                if (response.data.errorCode == 0){
                        this.setState({clientes : response.data.result})
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
                        {/* {this.state.clientes.map(function(element){
                            return (
                              <tr>
                                  <td>{element.numero}</td>
                                  <td>{element.nombre}</td>
                                  <td>{element.cuil}</td>
                                  <td>{element.activo ? "Si" : "No"}</td>
                              </tr>  
                            );  
                        })} */}
                    </tbody>
                </Table>
            </div>  
            
          )
      };
}
export default Clientes;