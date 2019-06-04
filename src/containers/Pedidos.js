import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Card, CardGroup, Container, Modal, Button, ButtonGroup, Table, InputGroup, FormControl} from 'react-bootstrap';
import './Pedidos.css';


class Pedidos extends Component{

  constructor(props) {
      super(props);

      this.textInput = React.createRef();

      this.state = {
          'isLoaded': false,
          'pedidos': [] ,
          'filtered': [] ,
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
           return !pedido.estado.toLowerCase().indexOf(filter)
       })

       this.setState({filtered : filtered})
    }


    handleShowPedidos = () => {
        if(this.props.show){
          try {
              axios.post(api.path + '/pedidos').then(response => {
                  if(response.data.errorCode === 0){
                      response.data.result.map(element => {
                          var date = new Date(element.fechaPedido);
                          var fdate = date.getDate() + '/' + (date.getMonth() + 1) +'/'+date.getFullYear();
                          element.fechaPedido = fdate;
                      });
                      this.setState({
                        'pedidos': response.data.result,
                        'filtered' : response.data.result,
                        'isLoaded':true
                      })
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

    render(){
      const pedidos = this.state.filtered;

      if (this.props.show && this.state.isLoaded === false){
          this.handleShowPedidos();
      }

      if (this.state.isLoaded){
          return(
              <div className = "Pedidos">
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
                         {pedidos.map(pedido => (

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
                                       {pedido.estado === "pendiente" 
                                       ? <Button variant="primary" href={`/pedidos/${pedido.numeroPedido}`}>Ver Detalles</Button>
                                       : <Button variant="secondary" href={`/pedidos/${pedido.numeroPedido}`}>Ver Detalles</Button>  }
                                        
                                   </td>
                               </tr>

                         ))}
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
      }
    }
}
export default Pedidos;
