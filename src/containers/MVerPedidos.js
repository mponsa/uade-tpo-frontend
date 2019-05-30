import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Table} from "react-bootstrap";
import './MVerPedidos.css';



class MCrearPedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            show : '',
            cliente : '',
            pedidos : '',
            pedido : '',
            isLoaded: false
        }
    }

    handleShowPedidos = () => {
        if(this.props.show){
        try {
                axios.post(api.path + '/pedidos/cliente',{
                  'numero': this.props.cliente.numero
            }).then(response => {
                if(response.data.errorCode === 0){
                    response.data.result.map(element => {
                        var date = new Date(element.fechaPedido);
                        var fdate = date.getDate() + '/' + (date.getMonth() + 1) +'/'+date.getFullYear();
                        element.fechaPedido = fdate;
                    });
                    this.setState({ 
                    'pedidos': response.data.result,
                    'isLoaded':true})
                }else{
                    if( this.props.show ){
                        alert(response.data.clientMessage);
                        this.closeModal();
                    }
                }
            })
        }catch(e){
            alert(e.message);
        }
        }   
    }

    closeModal = () => {
        this.setState({isLoaded:false})
        this.props.onHide();
    }

    handleFacturar = e => {
        let id = parseInt(e.target.id);

        try {
            axios.post(api.path + '/facturarPedido',{
              'numeroPedido': id
        }).then(response => {
            if(response.data.errorCode === 0){
                alert(response.data.clientMessage)
                //Cambiar estado del pedido que inicio el proceso desde el cliente.
                this.state.pedidos.map(element => {
                    if (element.numero == id){
                        element.estado = "facturado";
                    }
                });
                this.setState({isLoaded:false});
            }else{
                
                alert(response.data.clientMessage);
            }
        })
    }catch(e){
        alert(e.message)
    }
    }   
    

    handleAgregarItems = e => {
        alert(e.target.id)
    }
    

    render(){
        if (this.props.show && this.state.isLoaded == false){
            this.handleShowPedidos();
        }
        if (this.state.isLoaded){
        return(
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Pedidos para el cliente: {this.props.cliente.nombre}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="pedidosTable" id="table">
                    <thead>
                        <th>Numero</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {   

                            this.state.pedidos.map(pedido => (
                               
                              <tr className="items">
                                  <td>{pedido.numeroPedido}</td>
                                  <td>{pedido.fechaPedido}</td>
                                  <td>{pedido.estado}</td>
                                  <td>{pedido.estado === "pendiente"
                                  
                                    ? 
                                     <ButtonGroup>
                                        <Button className="facturarButton" id={pedido.numeroPedido} onClick={this.handleFacturar} size="sm" >Facturar</Button>
                                        <Button variant="secondary" className="agregarItemsButton" id={pedido.numeroPedido} onClick={this.handleAgregarItems} size="sm" >Agregar Items</Button>
                                     </ButtonGroup>
                                    :
                                     <Button className="verButton" id={pedido.numeroPedido} onClick={this.handleVer} size="sm" >Ver</Button>
                                    
                                }</td>
                                  
                              </tr>  
                            ))

                             
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button onClick={this.closeModal}>Cerrar</Button>
              </ButtonGroup>
              
            </Modal.Footer>
          </Modal>
        )
        }else{
            return(
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Body>
                        <h5> Cargando... </h5>
                    </Modal.Body>
             </Modal>
        )
        }
    }
}
export default MCrearPedido;