import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Clientes from "./containers/Clientes";
import Pedidos from "./containers/Pedidos";
import FormPedido from "./containers/FormPedido";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>


    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />

    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute  path="/clientes" exact component = {Clientes} props={childProps}/>

    <AuthenticatedRoute  path="/pedidos" exact component = {Pedidos} props={childProps}/>
    <AuthenticatedRoute  path="/nuevoPedido" exact component = {FormPedido} props={childProps}/>
    {/*

      <AuthenticatedRoute  path="/productos" exact component = {Productos} props={childProps}/>

      <AuthenticatedRoute  path="/pedidos/:id" exact component = {Pedido} props={childProps}/>
      <AuthenticatedRoute  path="/pedidos/new" exact component = {productos} props={childProps}/>

    */}

    {/*Toma las rutas no encontradas */}
    <Route component={NotFound}/>
  </Switch>;
