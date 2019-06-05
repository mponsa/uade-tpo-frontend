import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Card, ButtonGroup,Modal, Button, Table} from "react-bootstrap";
import MEliminar from './MEliminar.js';
import MCMProductos from './MCMProductos.js';

class Producto extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoaded : false,
            producto : '',
            showEP : false,
            showMP : false,
        };
    }

        getProducto = () =>  {
            try{
                axios.get(api.path + `/productoById?identificador=${this.props.match.params.id}`).then(response =>{
                    if(response.data.errorCode === 0){
                        
                        this.setState({producto : response.data.result,
                                       isLoaded: true})
                                       
                    }else{
                        alert(response.data.clientMessage)
                    }
                })
            }
            catch(e){
                alert(e.message)
            }
        }

        componentDidMount = () => {
            this.getProducto();
        }

        handleEliminar = () => {
            this.setState({'showEP':true})
        }

        handleModificar = () => {
            this.setState({'showMP':true})
        }

        handleModificacion = () => { //FUncion que se le pasa al modal luego de la actualización.
            this.getProducto();
        }

        render(){
            let showEPClose = () => this.setState({ 'showEP': false})
            let showMPClose = () => this.setState({ 'showMP': false})
            return(
                this.state.isLoaded
                  ? <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                    <Card.Title>Nombre: {this.state.producto.nombre}</Card.Title>
                    <Card.Title>Marca: {this.state.producto.marca}</Card.Title>
                        <Card.Text>
                        Rubro: {this.state.producto.rubro.descripcion}
                        </Card.Text>
                        <Card.Text>
                        SubRubro: {this.state.producto.subRubro.descripcion}
                        </Card.Text>
                        <Card.Text>
                        Precio: {this.state.producto.precio}
                        </Card.Text>
                        <Card.Text>
                        Código de barras: {this.state.producto.codigoBarras}
                        </Card.Text>
                    <Card.Footer>
                            <ButtonGroup>
                                <Button className="modificarButton" variant="primary" onClick={this.handleModificar}>Modificar</Button>
                                <Button className="delete" variant="danger" onClick={this.handleEliminar}>Eliminar</Button>
                            </ButtonGroup>
                            <MEliminar show={this.state.showEP} onHide={showEPClose} producto={this.state.producto}  />
                            <MCMProductos show={this.state.showMP} onHide={showMPClose} producto={this.state.producto} handleMod = {this.handleModificacion} />      
                    </Card.Footer>
                    </Card.Body>
                </Card>
                : 
                    <div>Cargando</div>
            )
        }

    
}
export default Producto;