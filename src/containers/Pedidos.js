import React, { Component } from "react";
import {Card, CardGroup,Container} from 'react-bootstrap';


class Pedidos extends Component{

    render(){
        return(

                <CardGroup>
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
                </CardGroup>


        )
    }
}
export default Pedidos;
