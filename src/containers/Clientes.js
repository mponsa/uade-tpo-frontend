import React, { ReactDOM , Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Table,InputGroup,FormControl,Button,Modal} from 'react-bootstrap';
import './Clientes.css';
import MCrearPedido from './MCrearPedido.js';
import MVerPedidos  from './MVerPedidos.js';


class Clientes extends Component {
    constructor(props) {
        super(props);
        
        this.textInput = React.createRef()
        
        this.handleCrearPedido = this.handleCrearPedido.bind(this);

        this.state = {
            'isLoaded': false,
            'clientes': [] ,
            'filtered': [] ,
            'showCP':false,//muestra el modal de crear pedido
            'showVP':false, //muestra el modal de mostrar pedidos para el cliente.
            'cliente': ''
        };

      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/clientes').then(response =>{
                if (response.data.errorCode === 0){    
                    this.setState({
                        isLoaded : true,
                        filtered : response.data.result,
                        clientes : response.data.result})
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
         filter = input.value.toUpperCase();
         

         filtered = this.state.clientes.filter(function(cliente){
             return !cliente.nombre.indexOf(filter)
         })
         
         this.setState({filtered : filtered})

         
      }

      handleCrearPedido = e => {
        this.setState({ 'cliente': this.state.clientes.find(cliente => cliente.numero == e.target.id),
                        'showCP':true})

      }

      

      handleMostrarPedidos = e => {
        this.setState({ 'cliente': this.state.clientes.find(cliente => cliente.numero == e.target.id),
                        'showVP':true});

      }

      render(){
        const clientes = this.state.filtered;
        let showCPClose = () => this.setState({ 'showCP': false, 
                                                'cliente': ''});
        let showVPClose = () => this.setState({ 'showVP': false,
                                                'cliente': ''});      
        if (this.state.isLoaded){
        return(
            <div className = "Clientes">
                 <InputGroup className="mb-3" onChange={this.handleChange}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Nombre</InputGroup.Text>
                    </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                </InputGroup>
                <Table className="myTable" id="table">
                    <thead>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cuil</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            
                              <tr>
                                  <td>{cliente.numero}</td>
                                  <td>{cliente.nombre}</td>
                                  <td>{cliente.cuil}</td>
                                  <td>{cliente.activo ? "Si" : "No"}</td>
                                  <td>
                                      <Button className="buttonCp" id={cliente.numero} variant="primary" size="sm" onClick={this.handleCrearPedido}>Crear pedido</Button>
                                      <Button className="buttonVp" id={cliente.numero} variant="secondary" size="sm" onClick={this.handleMostrarPedidos}>Ver pedidos</Button>
                                  </td>
                              </tr>  
                            
                        ))}
                    </tbody>
                </Table>
                <MCrearPedido show={this.state.showCP} onHide={showCPClose} cliente={this.state.cliente}/>
                <MVerPedidos show={this.state.showVP} onHide={showVPClose} cliente={this.state.cliente}/>

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
      };
}
export default Clientes;