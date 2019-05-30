import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Table, InputGroup, FormControl, Button, Modal} from 'react-bootstrap';
import './Clientes.css';

class Productos extends Component {
    constructor(props) {
        super(props);
        
        this.textInput = React.createRef()
        this.textRubroInput = React.createRef()
        this.state = {
            'isLoaded': false,
            'productos': [],
            'filtered': [],
            'producto': '' 
         };
      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/productos').then(response =>{
                if (response.data.errorCode == 0){    
                    this.setState({
                        isLoaded : true,
                        filtered : response.data.result,
                        productos : response.data.result})
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
            filter = input.value;
   
            filtered = this.state.productos.filter(function(producto){
                return !producto.nombre.indexOf(filter)
            })
            
            this.setState({filtered : filtered})
   
            
         }

         

        render(){
            const productos = this.state.filtered;  
            if (this.state.isLoaded){
            return(
                <div className = "Clientes">

                    <InputGroup className="mb-3" onChange={this.handleChange}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Nombre</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                    </InputGroup>

                    <InputGroup className="mb-3" onChange={this.handleRubroChange}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Rubro</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-describedby="basic-addon1" ref={this.textRubroInput}/>
                    </InputGroup>

                    <Table className="myTable" id="table">
                        <thead>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Rubro</th>
                            <th>SubRubro</th>
                            <th>Precio</th>
                            <th>Acciones</th>

                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                
                                <tr>
                                    
                                    <td>{producto.nombre}</td>
                                    <td>{producto.marca}</td>
                                    <td>{producto.rubro.descripcion}</td>
                                    <td>{producto.subRubro.descripcion}</td>
                                    <td>$ {producto.precio}</td>
                                    <td>
                                        <Button id="up" variant="primary" size="sm" active>Actualizar</Button>
                                        <Button id="dp" variant="secondary" size="sm" active>Eliminar</Button>
                                    </td>
                                </tr>  
                                
                            ))}
                        </tbody>
                    </Table>
                </div>  
                
              )
        }
        else{
            return(<Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Body>
                Cargando...
            </Modal.Body>
        </Modal>
        )
        }
          };
}
export default Productos;