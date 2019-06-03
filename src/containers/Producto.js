import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Modal, Button, Table} from "react-bootstrap";

class Producto extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoaded : false,
            prod : '',
            rubro : '',
            subRubro: ''
        };
    }

        getProducto = () =>  {
            try{
                
                axios.get(api.path + `/productoById?identificador=${this.props.match.params.id}`).then(response =>{
                    if(response.data.errorCode === 0){
                        
                        this.setState({prod : response.data.result,
                                       isLoaded: true})
                                       
                    }else{
                        alert(response.data.clientMessage)
                    }
                })
            }
            catch{
    
            }
        }

        componentDidMount = () => {
            this.getProducto();
        }

        render(){
            
            if (this.state.isLoaded){
                return(
                    <div className = "Producto">
                         
                        <Table className="myTable" id="table">
                            <thead>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Codigo</th>
                                <th>Marca</th>
                                <th>Rubro</th>
                                <th>SubRubro</th>
                                <th>Precio</th>
                                
                            </thead>
                            <tbody>
                                
                                    <tr>
                                        <td>{this.state.prod.identificador}</td>
                                        <td>{this.state.prod.nombre}</td>
                                        <td>{this.state.prod.codigoBarras}</td>
                                        <td>{this.state.prod.marca}</td>
                                        <td>{this.state.prod.rubro.descripcion}</td>
                                        <td>{this.state.prod.subRubro.descripcion}</td>
                                        <td>$ {this.state.prod.precio}</td>
                                        
                                    </tr>
        
                                
                            </tbody>
                        </Table>
                        
                    </div>
        
                  )
            }
            else{
                return(
                <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Body>
                        Cargando...
                    </Modal.Body>
                </Modal>
                )
            };
        
        }

    
}
export default Producto;