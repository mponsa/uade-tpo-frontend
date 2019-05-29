import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import {Table, InputGroup, FormControl,ButtonToolbar, Button} from 'react-bootstrap';

class Productos extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            'isLoaded': false,
            'productos': [] };
      }

      async componentDidMount(){
        try {
            axios.get(api.path + '/productos').then(response =>{
                if (response.data.errorCode == 0){    
                    this.setState({
                        isLoaded : true,
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

        render(){
            const productos = this.state.productos;  
            if (this.state.isLoaded){
            return(
                <div>

                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Nombre</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>

                    <Table>
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
                                    <ButtonToolbar>
                                        <Button id="up" variant="primary" size="sm" active>
                                            Actualizar
                                        </Button>
                                        <Button id="dp" variant="secondary" size="sm" active>
                                            Eliminar
                                        </Button>
                                    </ButtonToolbar>
                                </tr>  
                                
                            ))}
                        </tbody>
                    </Table>
                </div>  
                
              )
        }
        else{
            return(<div>Cargando</div>)
        }
          };
}
export default Productos;