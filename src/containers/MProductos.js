import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Table , InputGroup , FormControl} from "react-bootstrap";



class MProductos extends Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef()
        this.state = {
            show : '',
            productos : '',
            filtered : '',
            producto : '',
            isLoaded: false
        }
    }

    getProductos = () => {
        try {
            axios.get(api.path + '/productos').then(response => {
                if(response.data.errorCode === 0){
                    this.setState({ 
                    'productos': response.data.result,
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


    handleShowProductos = () => {
        this.getProductos();
    }

    closeModal = () => {
        this.setState({isLoaded:false})
        this.props.onHide();
    }

    handleChange = e => {
        var input, filter, filtered;
        input = this.textInput.current
        filter = input.value.toLowerCase();
        
        filtered = this.state.productos.filter(function(producto){
            return !producto.nombre.toLowerCase().indexOf(filter)
        })
        
        this.setState({filtered : filtered})
     }

     agregarItem = e => {
         this.props.agregarItem(e.target.id);
         this.closeModal();
     }

    render(){
        const productos = this.state.filtered;
        if (this.props.show && this.state.isLoaded == false){
            this.handleShowProductos();
        }
        if (this.state.isLoaded){
        return(
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Productos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3" onChange={this.handleChange}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Nombre</InputGroup.Text>
                    </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                </InputGroup>
                <Table className="productosTable" id="table">
                    <thead>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Rubro</th>
                        <th>SubRubro</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {   

                            productos.map(producto => (
                               
                              <tr className="items">
                                  <td>{producto.nombre}</td>
                                  <td>{producto.marca}</td>
                                  <td>{producto.rubro.descripcion}</td>
                                  <td>{producto.subRubro.descripcion}</td>
                                  <td>{producto.precio}</td>
                                  <td>{this.props.buscador
                                    ?   //Si es un buscador damos la posibilidad de ver el producto para (Modificar, Eliminar)
                                        <Button className="verButton" id={producto.identificador} onClick={this.handleVer} size="sm" href="#{`/productos/${producto.numeroPedido }`}">Ver</Button>
                                    :   //Si no es un buscador, es llamado desde Pedidos, y devuelve la función prop de agregar Items al producto.
                                        <Button variant="secondary" id={producto.identificador} onClick={this.agregarItem} size="sm">Agregar Item</Button>
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
export default MProductos;