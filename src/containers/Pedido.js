import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Card, Button, ButtonGroup, Table} from "react-bootstrap";
import MEliminarPedido from  './MEliminarPedido';
import MProductos from "./MProductos.js";
import MCantidad from "./MCantidad.js";



class Pedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoaded : false,
            pedido : '',
            producto : '',
            showEP : false,
            showMP : false,
            showC : false
        }

    }

    getPedido = () =>  {
        try{
            axios.get(api.path + `/pedido?numero=${this.props.match.params.id}`).then(response =>{
                if(response.data.errorCode === 0){
                    this.setState({pedido : response.data.result,
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
        this.getPedido();
    }

    handleFacturar = () => {
        this.setState({isLoaded:false});
        try {
            axios.post(api.path + '/facturarPedido',{
              'numeroPedido': this.state.pedido.numeroPedido
        }).then(response => {
            if(response.data.errorCode === 0){
                alert(response.data.clientMessage)
                this.getPedido();
            }else{

                alert(response.data.clientMessage);
            }
        })
    }catch(e){
        alert(e.message)
    }
    }

    handleEliminar = () => {
        this.setState({'showEP':true})
    }

    handleAgregarItems = () =>{ // Muestra el Modal de Productos
        this.setState({'showMP':true})
    }

    handleAgregarItem = (identificador) => { // Función que ejecuta el "Agregar Items" del modal Productos.
        this.setState({'producto' : identificador,
                       'showC': true });

    }

    handleSetearCantidad = (c) => { //Función que ejecuta el modal de cantidad.
        //Cuando seteamos el ultimo parámetro llamamos a la función de agregarItem
        try{
            axios.post(api.path + '/agregarProductos', {
                id : this.state.pedido.numeroPedido,
                productoId : this.state.producto,
                cantidad : c
            }).then(response => {
                if(response.data.errorCode === 0){
                    alert(response.data.clientMessage);
                    this.getPedido();
                }else{
                    alert(response.data.clientMessage);
                }
            })
        }catch(e){
            alert(e.message)
        }
    }

    render(){
        let showEPClose = () => this.setState({ 'showEP': false})
        let showMPClose = () => this.setState({ 'showMP': false})
        let showCClose = () => this.setState({'showC': false})
        return(
            this.state.isLoaded
              ? <Card>
                <Card.Header>Pedido número: {this.state.pedido.numeroPedido}</Card.Header>
                <Card.Body>
                    <Card.Title>Cliente: {this.state.pedido.cliente.nombre} Cuil: {this.state.pedido.cliente.cuil}</Card.Title>
                    <Card.Text>
                    Fecha del pedido: {(new Date(this.state.pedido.fechaPedido)).getDate() + '/' +
                                       ((new Date(this.state.pedido.fechaPedido)).getMonth() + 1) + '/' +
                                       (new Date(this.state.pedido.fechaPedido)).getFullYear()}
                    </Card.Text>
                    <Card.Text>
                    Estado: {this.state.pedido.estado}
                    </Card.Text>
                    <Table className="itemTable" id="table">
                    <thead>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                        {   this.state.pedido.items

                            ?

                            this.state.pedido.items.map(item => (

                              <tr className="items">
                                  <td>{item.producto.nombre}</td>
                                  <td>{item.cantidad}</td>
                                  <td>{item.producto.precio}</td>
                                  <td>{item.producto.precio * item.cantidad}</td>
                              </tr>
                            ))
                            :
                              <div className="noItemsMessage">No hay items para mostrar</div>

                        }
                    </tbody>
                </Table>
                <Card.Footer>
                {this.state.pedido.estado === "pendiente"
                    ?
                        <div>
                        <ButtonGroup>
                            <Button className="agregarItemsButton" variant="primary" onClick={this.handleAgregarItems}>Agregar Items</Button>
                            <Button className="facturarButton" variant="success" onClick={this.handleFacturar}>Facturar</Button>
                            <Button className="delete" variant="danger" onClick={this.handleEliminar}>Eliminar</Button>
                        </ButtonGroup>
                        <MEliminarPedido show={this.state.showEP} onHide={showEPClose} pedido={this.state.pedido}  />
                        <MProductos show={this.state.showMP} onHide={showMPClose} agregarItem ={this.handleAgregarItem}/>
                        <MCantidad show={this.state.showC} onHide={showCClose} setearCantidad={this.handleSetearCantidad}/>
                        </div>
                    :
                        <div><Button href="/"> Volver al inicio</Button></div>
                }
                </Card.Footer>
                </Card.Body>
            </Card>
            : <div>Cargando</div>
        )
    }

}
export default Pedido;
