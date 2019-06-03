import React, { Component } from "react";
import {Card, CardGroup, Container, Modal, Button, ButtonGroup, Table, InputGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import api from '../components/Api.js';
import './Pedidos.css';


class Pedidos extends Component{

  constructor(props) {
      super(props);

      this.textInput = React.createRef();

      //this.handleCrearPedido = this.handleCrearPedido.bind(this);

      this.state = {
          'isLoaded': false,
          'pedidos': [] ,
          'filtered': [] ,
          'showCP':false,//muestra el modal de crear pedido
          'showVP':false, //muestra el modal de mostrar pedidos para el cliente.
          'estado': ''
      };

    }

    async componentDidMount(){
      try {
          axios.get(api.path + '/pedidos').then(response =>{
              if (response.data.errorCode === 0){
                  this.setState({
                      isLoaded : true,
                      filtered : response.data.result,
                      pedidos : response.data.result})
                 }else{
                      alert(response.data.clientMessage)
                }
          })
        }
        catch(e) {
            alert(e);
        }
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

    // handleCrearPedido = e => {
    //   this.setState({ 'cliente': this.state.pedidos.find(cliente => cliente.numero == e.target.id),
    //                   'showCP':true})
    // }

    // handleMostrarPedidos = e => {
    //   this.setState({ 'cliente': this.state.pedidos.find(cliente => cliente.numero == e.target.id),
    //                   'showVP':true});
    // }

    render(){
      const pedidos = this.state.filtered;
      // let showCPClose = () => this.setState({ 'showCP': false,
      //                                         'cliente': ''});
      // let showVPClose = () => this.setState({ 'showVP': false,
      //                                         'cliente': ''});
      if (this.state.isLoaded){
          return(
              <div className = "Pedidos">
                  {/*<CardGroup>
                      <Card class="option" >
                          <Card.Header>
                              <Card.Title>Pedidos por cliente</Card.Title>
                          </Card.Header>
                          <Card.Body>
                              <Card.Text>
                                  Seleccione un cliente de la lista para ver los pedidos que le corresponden.
                              </Card.Text>
                              <Card.Link href="#">Card Link</Card.Link>
                              <Card.Link href="#">Another Link</Card.Link>
                          </Card.Body>
                      </Card>
                      <Card class="option" >
                          <Card.Header>
                              <Card.Title>Pedidos por estado</Card.Title>
                          </Card.Header>
                          <Card.Body>
                              <Card.Text>
                                  Seleccione un estado de la lista para ver los pedidos que le corresponden.
                              </Card.Text>
                              <Card.Link href="#">Card Link</Card.Link>
                              <Card.Link href="#">Another Link</Card.Link>
                          </Card.Body>
                      </Card>
                      <Card class="option" >
                          <Card.Header>
                              <Card.Title>Todos los pedidos</Card.Title>
                          </Card.Header>
                          <Card.Body>
                              <Card.Text>
                                  Muestra todos los pedidos de la lista.
                              </Card.Text>
                              <Card.Link href="#">Card Link</Card.Link>
                              <Card.Link href="#">Another Link</Card.Link>
                          </Card.Body>
                      </Card>
                  </CardGroup>*/}
                  <InputGroup className="mb-3" onChange={this.handleChange}>
                     <InputGroup.Prepend>
                         <InputGroup.Text id="inputGroup-sizing-sm">Pedidos en Estado</InputGroup.Text>
                     </InputGroup.Prepend>
                     <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                 </InputGroup>
                 <Table className="myTable" id="table">
                     <thead>
                         <th>Pedido N°</th>
                         <th>Cliente</th>
                         <th>Fecha</th>
                         <th>Estado</th>
                     </thead>
                     <tbody>
                         {this.state.pedidos.map(pedido => (

                               <tr>
                                   <td>{pedido.numeroPedido}</td>
                                   <td>{pedido.cliente.nombre}</td>
                                   <td>
                                        {(new Date(pedido.fechaPedido)).getDate() + '/' +
                                        ((new Date(pedido.fechaPedido)).getMonth() + 1) + '/' +
                                        (new Date(pedido.fechaPedido)).getFullYear()}
                                   </td>
                                   <td>{pedido.estado}</td>
                                   <td>
                                       {/* <Button className="buttonCp" id={cliente.numero} variant="primary" size="sm" onClick={this.handleCrearPedido}>Crear pedido</Button>*/}
                                        <Button action href={`/pedidos/${pedido.numeroPedido}`}>Ver Detalles</Button>
                                   </td>
                               </tr>

                         ))}
                     </tbody>
                 </Table>
                  {/*<MCrearPedido show={this.state.showCP} onHide={showCPClose} cliente={this.state.cliente}/>*/}
                  {/*<MVerPedidos show={this.state.showVP} onHide={showVPClose} cliente={this.state.cliente}/>*/}
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
      }
    }
}
export default Pedidos;
