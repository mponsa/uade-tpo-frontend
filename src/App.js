import React, { Component , Fragment} from "react";
import { Navbar, Nav, Button  } from "react-bootstrap";
import Routes from "./Routes.js";
import "./App.css";
import { Link, withRouter } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }


  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    // Acá tendriamos que hacer el SET de la cookie LoggedIn a "false"
    this.userHasAuthenticated(false);
    window.localStorage.removeItem("loggedin");
    //Redirigimos al login.
    this.props.history.push("/login");
  }


  async componentDidMount() {
    try {
      // Acá tendriamos que implementar el GET de la COOKIEEE y pasarle ese estado al método UUSER HAS AUTHENTICATED!!
      this.userHasAuthenticated(window.localStorage.getItem("loggedin"));
      console.log("Usuario :: " + this.state.isAuthenticated)
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && //Esto hace que espere a tomar el estado de la sesión.
      <div className="App container">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">APD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>

              {this.state.isAuthenticated
              ? <Nav pullRight>

                <Nav.Item>
                  <Nav.Link href="/clientes">Clientes</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link href="#productos">Productos</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                </Nav.Item>

                <Nav.Item onClick={this.handleLogout}>
                  <Button variant="primary">Logout</Button>
                </Nav.Item>

                </Nav>
              : <Nav>
                <Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Fragment>
                </Nav>
              }

          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}
export default withRouter(App);
//Se agrega el HOC (High order Component) para poder utilizar las props del Router.
