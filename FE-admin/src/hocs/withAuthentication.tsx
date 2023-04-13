/* eslint-disable indent */
import React, { ComponentType, FC } from "react";
import { Redirect } from "react-router-dom";
import { routeSigninBase } from "src/constants/routes";

const withAuthentication =
  <P extends any>(Component: ComponentType<P>): FC<P> =>
  (props) => {
    const isAuthenticated = localStorage.getItem("token") as any;
    if (isAuthenticated) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: routeSigninBase,
        }}
      />
    );
  };

export default withAuthentication;
