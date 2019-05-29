import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Table} from "react-bootstrap";



class MCrearPedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            show : '',
            cliente : '',
            pedidos : '',
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
                    this.setState({ 'cliente': this.props.cliente,
                                    'pedidos': response.data.result,
                                    'isLoaded':true})
                }else{
                    alert(response.data.clientMessage)
                }
            })
        }catch(e){
            alert(e.message)
        }
        }   
    }

    render(){
        if (this.props.show){
            this.handleShowPedidos();
        }
        if (this.state.isLoaded){
        return(
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Pedidos para el cliente: {this.state.cliente.nombre}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="pedidosTable" id="table">
                    <thead>
                        <th>Numero</th>
                        <th>Fecha</th>
                        <th>Items</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {   

                            this.state.pedidos.map(pedido => (
                             
                              <tr className="items">
                                  <td>{pedido.numeroPedido}</td>
                                  <td>{pedido.fechaPedido}</td>
                                  <td>{pedido.items.lenght}</td>
                                  <td>{pedido.estado}</td>
                                  <td>{pedido.estado === "pendiente"
                                  
                                    ? 
                                     <ButtonGroup>
                                        <Button>Facturar</Button>
                                        <Button>Agregar Items</Button>
                                     </ButtonGroup>
                                    :
                                     <Button>Ver</Button>
                                    
                                }</td>
                                  
                              </tr>  
                            ))

                             
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button onClick={this.props.onHide}>Close</Button>
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