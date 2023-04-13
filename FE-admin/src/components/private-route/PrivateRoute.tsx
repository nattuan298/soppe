import { ElementType } from "react";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteProps {
  component?: ElementType;
  roles?: any;
  exact?: boolean;
  path?: string;
}

export const PrivateRoute = ({
  component: Component = () => null,
  roles,
  ...props
}: PrivateRouteProps) => (
  <Route
    {...props}
    render={(props) => {
      const token = localStorage.getItem("token");

      if (!token) {
        return <Redirect to={{ pathname: "/signin" }} />;
      }

      return <Component {...props} />;
    }}
  />
);
