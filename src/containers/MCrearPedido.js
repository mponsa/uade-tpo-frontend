import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Table, Row, Col ,FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './MCrearPedido.css';


class MCrearPedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            show : '',
            cliente :'',
            pedido : '',
            isLoaded: false
        }
    }

    handleCrearPedido = e => {

        try {
                axios.post(api.path + '/crearPedido',{
                  'cliente': this.props.cliente
            }).then(response => {
                if(response.data.errorCode === 0){
                    this.setState({ 'cliente': this.props.cliente,
                                    'pedido': response.data.result,
                                    'isLoaded':true})
                }else{
                    alert(response.data.clientMessage)
                }
            })
        }catch(e){
            alert(e.message)
        }


    }

    closeModal = () => {
        this.setState({isLoaded:false})
        this.props.onHide()
    }

    render(){
        if (this.state.isLoaded){
        return(
          <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Se ha creado el Pedido Nº: {this.state.pedido.numeroPedido}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        Cliente:
                    </Col>
                    <Col>
                        {this.state.pedido.cliente.nombre}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Fecha:
                    </Col>
                    <Col>
                        {Date(this.state.pedido.fechaPedido)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Items:
                    </Col>
                </Row>
                <Table className="itemTable" id="table">
                    <thead>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                        {   this.state.pedido.items.lenght > 0

                            ?

                            this.state.pedido.items.map(item => (

                              <tr className="items">
                                  <td>{item.producto.nombre}</td>
                                  <td>{item.cantidad}</td>
                                  <td>{item.producto.precio}</td>
                                  <td>{item.producto.precio * item.cantidad}</td>
                                  <td>
                                      <Button>Crear pedido</Button>
                                      <Button>Ver pedidos</Button>
                                  </td>
                              </tr>
                            ))
                            :
                              <div className="noItemsMessage">No hay items para mostrar</div>

                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button action href={`/pedidos/${this.state.pedido.numeroPedido}`}>Ir al Pedido</Button>
                <Button variant="danger" onClick={this.closeModal}>Cerrar</Button>
              </ButtonGroup>
            </Modal.Footer>
          </Modal>
        )
        }else{
            return(
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Body>
                        Está seguro que quiere crear un pedido para: {this.props.cliente ? this.props.cliente.nombre : ""} ?
                        <ButtonGroup className="buttons">
                            <Button className="button" onClick={this.handleCrearPedido}>Si</Button>
                            <Button className="button" onClick={this.closeModal}> No </Button>
                        </ButtonGroup>
                    </Modal.Body>
             </Modal>
        )
        }
    }
}
export default MCrearPedido;
