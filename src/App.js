import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav , NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import Routes from "./Routes.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">APD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}
export default App;