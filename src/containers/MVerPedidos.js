import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Table , InputGroup , FormControl} from "react-bootstrap";
import './MVerPedidos.css';



class MVerPedidos extends Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef()
        this.state = {
            show : '',
            cliente : '',
            pedidos : '',
            filtered : '',
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
                    'filtered' : response.data.result,
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

    handleChange = e => {
        var input, filter, filtered;
        input = this.textInput.current
        filter = input.value.toLowerCase();
        
        filtered = this.state.pedidos.filter(function(pedido){
            return !pedido.estado.indexOf(filter)
        })
        
        this.setState({filtered : filtered})

        
     }


    render(){
        const pedidos = this.state.filtered;
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
                <InputGroup className="mb-3" onChange={this.handleChange}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Estado</InputGroup.Text>
                    </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                </InputGroup>
                <Table className="pedidosTable" id="table">
                    <thead>
                        <th>Numero</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {   

                            pedidos.map(pedido => (
                               
                              <tr className="items">
                                  <td>{pedido.numeroPedido}</td>
                                  <td>{pedido.fechaPedido}</td>
                                  <td>{pedido.estado}</td>
                                  <td>{pedido.estado === "pendiente"
                                    ? <Button className="verButton" id={pedido.numeroPedido} onClick={this.handleVer} size="sm" href={`/pedidos/${pedido.numeroPedido }`}>Ver</Button>
                                    : <Button variant="secondary" className="verButton" id={pedido.numeroPedido} onClick={this.handleVer} size="sm" href={`/pedidos/${pedido.numeroPedido }`}>Ver</Button>
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
export default MVerPedidos;