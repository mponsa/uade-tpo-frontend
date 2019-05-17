import React, { Component } from "react";
import brand from './resources/LogoUADE.png';
import {Image} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>TPO Distribuidas</h1>
          <p>Aplicación para la gestión integral de tu propia tienda.</p>
          <Image src={brand} fluid />
        </div>
      </div>
    );
  } rounded
}