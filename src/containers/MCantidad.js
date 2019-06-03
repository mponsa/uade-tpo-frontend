import React, { Component } from "react";
import { Modal, Button, ButtonGroup, InputGroup, FormControl} from "react-bootstrap";
import './MCrearPedido.css';


class MCantidad extends Component{
    constructor(props){
        super(props);

        this.textInput = React.createRef();

        this.state = {
            show : '',
        }
    }


    closeModal = () => {
        this.props.onHide()
    }

    agregarCantidad = () => {
        var input = parseInt(this.textInput.current.value);
        this.props.setearCantidad(input);
        this.closeModal();
    }

    render(){
            return(
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cantidad
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Cantidad</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-describedby="basic-addon1" ref={this.textInput}/>
                        </InputGroup>
                        <ButtonGroup className="buttons">
                            <Button className="button" onClick={this.agregarCantidad}> Agregar </Button>
                        </ButtonGroup>
                    </Modal.Body>
             </Modal>
        )
    }
}
export default MCantidad;