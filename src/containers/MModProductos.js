import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Form, Col, FormControl} from "react-bootstrap";



class MProductos extends Component{
    constructor(props){
        super(props);
        this.rubroSelection = React.createRef();
        this.subRubroSelection = React.createRef();
        this.state = {
            show : this.props.show,
            producto : this.props.producto,
            rubros: '',
            subRubros: '',
            filteredSubRubros: '',
            isLoadedR: false,
            isLoadedSR: false,
            //Nuevos valores para el producto.
            rubro: '',
            subRubro: '',
            nombre: '',
            marca: '',
            precio: '',
        }
    }

    componentDidMount = () =>  {
        try{
            this.getRubros();
            this.getSubRubros();
        }
        catch(e){
            alert(e.message)
        }
    }

    getRubros = () => {
        try{
            axios.get(api.path + '/rubros').then(response => {
                if(response.data.errorCode === 0){
                    var filteredRubros = response.data.result;
                    filteredRubros.unshift(this.state.producto.rubro);
                    this.setState({rubros : response.data.result,
                                   filteredRubros : filteredRubros,
                                   isLoadedR: true})
                }else{
                    alert(response.data.clientMessage)
                }
            })
        }catch(e){
            alert(e.message)
        }
    }

    getSubRubros = () => {
            try{
                axios.get(api.path + '/subrubros').then(response => {
                    if(response.data.errorCode === 0){
                        this.setState({subRubros : response.data.result,
                                        isLoadedSR: true})
             
                    }else{
                        alert(response.data.clientMessage)
                    }
                })
            }catch(e){
                alert(e.message)
            }
        }
    
    handleRubroChange = e => {
        var input, filter, filtered,rubroSel;
        this.subRubroSelection.current.value = '';
        input = this.rubroSelection.current;
        filter = input.value;
        filtered = this.state.subRubros.filter(function(subrubro){
             return !subrubro.rubro.descripcion.indexOf(filter)
        })

        rubroSel = this.state.rubros.filter(function(rubro){
            return !rubro.descripcion.indexOf(filter)
        })

  
        this.setState({filteredSubRubros : filtered,
                        rubro : rubroSel })
    }
    
    
    handleSubRubroChange = e => {
        var input, filter,subRubroSel;
        input = this.subRubroSelection.current;
        filter = input.value;
        subRubroSel = this.state.subRubros.filter(function(subrubro){
            return !subrubro.descripcion.indexOf(filter)
        })
        this.setState({ subRubro : subRubroSel })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
        console.log(this.state.nombre)
    }


    handleSubmit = e => {
        //Se cambian sólo los campos que tuvieron modificación
        if(this.state.nombre){this.state.producto.nombre = this.state.nombre}
        if(this.state.marca){this.state.producto.marca = this.state.marca}
        if(this.state.precio){this.state.producto.precio = this.state.precio}
        if(this.state.rubro){this.state.producto.rubro = this.state.rubro}
        if(this.state.subRubro){this.state.producto.subRubro = this.state.subRubro}

        try{
            axios.post(api.path + '/modificarProducto', this.state.producto).then(response=>{
                
                    alert(response.data.clientMessage);
               
            })
            this.props.handleMod();
            
        }catch(e){
            alert(e.message);
        }


    }

    validateForm() {
        return this.state.precio > 0;
      }


    closeModal = () => {
        this.setState({rubro:'',
                       subRubro:'',
                       nombre:'',
                       marca:'',
                       precio:'',
                       filteredSubRubros: ''})
        this.props.onHide();
    }




    render(){
        return(
            this.state.isLoadedR && this.state.isLoadedSR
            ?<Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modificar producto
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder={this.state.producto.nombre} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder={this.state.producto.marca} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formCodBarra">
                    <Form.Label>Código de barras</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={this.state.producto.codigoBarras}/>
                    <Form.Text className="text-muted">
                        No se permite modificar el código de barras.
                    </Form.Text>
                </Form.Group>
                </Form.Row>
                <Form.Group controlId="formRubro">
                <Form.Label>Rubro</Form.Label>
                    <Form.Control as="select" onChange={this.handleRubroChange} ref={this.rubroSelection}>
                        {this.state.filteredRubros.map(rubro => (
                            <option id={rubro.codigo}>
                                {rubro.descripcion}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formSubRubro">
                <Form.Label>SubRubro</Form.Label>
                    <Form.Control as="select" onChange={this.handleSubRubroChange} ref={this.subRubroSelection}>
                        {this.state.rubro 
                        ? this.state.filteredSubRubros 
                            ? 
                            this.state.filteredSubRubros.map(subrubro => (
                            <option id={subrubro.codigo}>
                                {subrubro.descripcion}
                            </option>))
                            :
                            <option>
                                Elija un Rubro primero
                            </option>
                        : <option>{this.state.producto.subRubro.descripcion}</option>
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="precio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="text" placeholder={this.state.producto.precio} onChange={this.handleChange} />
                </Form.Group>
                <Button type="submit" disabled={!this.validateForm()} variant="primary">
                    Modificar
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button onClick={this.closeModal}>Cerrar</Button>
              </ButtonGroup>
              
            </Modal.Footer>
          </Modal>
          :
          <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Body>
              Cargando...
          </Modal.Body>
          </Modal>
        )
    }
}
export default MProductos;