import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Modal, Button, ButtonGroup} from "react-bootstrap";
import './MCrearPedido.css';
import {  withRouter } from "react-router-dom";

class MEliminar extends Component{
    constructor(props){
        super(props);

        this.state = {
            show : '',
            pedido : this.props.pedido,
            producto : this.props.producto
        }
    }

    handleEliminarPedido = event => {
        try{
            axios.post(api.path + '/eliminarPedido',{
                numeroPedido : this.state.pedido.numeroPedido
            }).then(response => {
                if(response.data.errorCode === 0){
                    alert(response.data.clientMessage);
                    this.props.history.push("/clientes");
                }
            })
        }
        catch(e){
            alert(e.message);
            this.closeModal();
        }
    }

    handleEliminarProducto = event => {
        try{
            axios.post(api.path + '/bajaProducto',{
                identificador : this.state.producto.identificador
            }).then(response => {
                if(response.data.errorCode === 0){
                    alert(response.data.clientMessage);
                    this.props.history.push("/");
                }
            })
        }
        catch(e){
            alert(e.message);
            this.closeModal();
        }
    }

    closeModal = () => {
        this.props.onHide()
    }

    render(){
            return(
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Body>
                        Está seguro que quiere eliminar el {this.state.producto ? "producto" : "pedido"} ?
                        <ButtonGroup className="buttons">
                            <Button className="button" onClick={this.state.producto ? this.handleEliminarProducto : this.handleEliminarPedido}>Si</Button>
                            <Button className="button" onClick={this.closeModal}> No </Button>
                        </ButtonGroup>
                    </Modal.Body>
             </Modal>
        )
    }
}
export default withRouter(MEliminar);