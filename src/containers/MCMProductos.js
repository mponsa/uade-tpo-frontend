import React, { Component } from "react";
import axios from 'axios';
import api from '../components/Api.js';
import { Modal, Button, ButtonGroup, Form, Col, FormControl} from "react-bootstrap";



class MCMProductos extends Component{
    constructor(props){
        super(props);
        this.rubroSelection = React.createRef();
        this.subRubroSelection = React.createRef();
        this.state = {
            show : this.props.show,
            producto : this.props.producto,
            mod : this.props.producto ? true : false, 
            rubros: '',
            subRubros: '',
            filteredSubRubros: '',
            isLoadedR: false,
            isLoadedSR: false,
            //Nuevos valores para el producto tanto si se modifica cómo si se crea uno nuevo.
            rubro: this.props.producto ? this.props.producto.rubro : '',
            subRubro: this.props.producto ? this.props.producto.subRubro : '',
            nombre: this.props.producto ? this.props.producto.nombre : '',
            marca: this.props.producto ? this.props.producto.marca : '',
            precio: this.props.producto ? this.props.producto.precio : '',
            codigoBarras: this.props.producto ? this.props.producto.codigoBarras     : '',
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
                    if(this.state.producto){
                        filteredRubros.unshift(this.state.producto.rubro); //Si hay un producto, pone el rubro primero en el dropdown
                    }
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
                        rubro : rubroSel[0] })
    }
    
    
    handleSubRubroChange = e => {
        var input, filter,subRubroSel;
        input = this.subRubroSelection.current;
        filter = input.value;
        subRubroSel = this.state.subRubros.filter(function(subrubro){
            return !subrubro.descripcion.indexOf(filter)
        })
        this.setState({ subRubro : subRubroSel[0] })
    }

    handleChange = e => {
        this.setState({
           [e.target.id]: e.target.value
          });
          
    }


    handleGrabar = e => {

            //Set del objecto producto
            let newProduct = {
                rubro: this.state.rubro,
                subRubro: this.state.subRubro,
                nombre: this.state.nombre,
                marca: this.state.marca,
                codigoBarras: this.state.codigoBarras,
                precio: parseInt(this.state.precio)
            };

            if  (this.state.mod)
                newProduct.identificador = this.state.producto.identificador;


            this.setState({producto : newProduct}
               , () => {
 
                if(this.state.mod){
            
                    try{
                        axios.post(api.path + '/modificarProducto', this.state.producto).then(response=>{
                            
                                alert(response.data.clientMessage);
                                this.props.handleMod();
                                this.closeModal();
                        })
                        
                        
                    }catch(e){
                        alert(e.message);
                    }
                }else{
                    try{
                        axios.post(api.path + '/altaProducto', this.state.producto).then(response=>{
                            
                            alert(response.data.clientMessage);
                           this.closeModal();
                        })      
                    }catch(e){
                        alert(e.message);
                    }
                }
            });



            
    }

    validateForm() {
        return this.state.producto 
        ? this.state.precio > 0 
        : this.state.precio > 0 && this.state.nombre != '' && 
        this.state.marca != '' && 
        this.state.rubro != '' && 
        this.state.subRubro != '' &&
        this.state.codigoBarras != '';
      }


    closeModal = () => {
        this.setState({rubro:'',
                       subRubro:'',
                       nombre:'',
                       marca:'',
                       codigoBarras:'',
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
                {this.state.producto ? "Modificar Producto" : "Crear Producto"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" plaintext={this.state.producto} onChange={this.handleChange} readOnly={this.state.producto} defaultValue={this.state.producto ? this.state.producto.nombre : ''}/>
                </Form.Group>
                <Form.Group as={Col} controlId="marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" plaintext={this.state.producto} onChange={this.handleChange} readOnly={this.state.producto} defaultValue={this.state.producto ? this.state.producto.marca : ''}/>
                </Form.Group>
                </Form.Row>
                
                {this.state.producto
                ?   
                <Form.Row> 
                    <Form.Group as={Col} controlId="formRubro">
                        <Form.Label>Rubro</Form.Label>
                        <Form.Control type="text" plaintext={this.state.producto} onChange={this.handleChange} readOnly={this.state.producto} defaultValue={this.state.producto ? this.state.producto.rubro.descripcion : ''}/>
                    </Form.Group>
            
                   <Form.Group as={Col} controlId="formSubRubro">
                        <Form.Label>SubRubro</Form.Label>
                        <Form.Control type="text" plaintext readOnly defaultValue={this.state.producto ? this.state.producto.subRubro.descripcion : ''}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCodBarra">
                        <Form.Label>Código de barras</Form.Label>
                        <Form.Control type="text" plaintext readOnly defaultValue={this.state.producto ? this.state.producto.codigoBarras : ''}/>
                        <Form.Text className="text-muted">
                            No se permite modificar el código de barras.
                        </Form.Text>
                    </Form.Group>
                </Form.Row> 
                :
                <Form.Row>
                    <Form.Group as={Col} controlId="formRubro">
                        <Form.Label>Rubro</Form.Label>
                        <Form.Control as="select" onChange={this.handleRubroChange} ref={this.rubroSelection}>
                            {this.state.filteredRubros.map(rubro => (
                                <option id={rubro.codigo}>
                                    {rubro.descripcion}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSubRubro">
                        <Form.Label>SubRubro</Form.Label>
                        <Form.Control as="select" onChange={this.handleSubRubroChange} ref={this.subRubroSelection}>
                        {
                         this.state.filteredSubRubros 
                            ? 
                            this.state.filteredSubRubros.map(subrubro => (
                            <option id={subrubro.codigo}>
                                {subrubro.descripcion}
                            </option>))
                            :
                            <option>
                                Elija un Rubro primero
                            </option>
                        }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="codigoBarras">
                        <Form.Label>Código de barras</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange}/>
                    </Form.Group>
                </Form.Row>}
                <Form.Group controlId="precio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="text" placeholder={this.state.producto ? this.state.producto.precio : ''} onChange={this.handleChange} />
                </Form.Group>
                <Button disabled={!this.validateForm()} onClick={this.handleGrabar} variant="primary">
                    {this.state.producto ? "Modificar" : "Crear"}
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
export default MCMProductos;