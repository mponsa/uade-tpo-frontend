import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <C {...props} {...cProps} /> //Renderiza el componente sólo si está autenticado.
        : <Redirect //Si no redirige al login.
            to={`/login?redirect=${props.location.pathname}${props.location
              .search}`}
          />}
  />;