import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "material-react-toastify/dist/ReactToastify.css";

import { PageLayout } from "src/components";
import { routesConfig } from "./routes-config";
import { theme } from "src/theme";
import "./styles/tailwind.css";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import {
  ChangePasswordForm,
  PasswordRecovery1,
  PasswordRecovery2,
  SignIn2FAForm,
  SignInForm,
} from "./modules/auth";
import { execute } from "src/lib/execute";
import { routesHomeDashboard } from "./constants/routes";
import Page404 from "src/pages/404Page";
import { subscribeToTopic } from "src/lib/firebase/clientApp";
import { incressCountNotification } from "src/store/notification.slice";
import { fetchGetTopicNotification } from "src/store/notification.action";
import { RootState } from "src/store";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation("common");
  const isLoggedIn = JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken;
  const dispatch = useDispatch();
  const language = localStorage.getItem("i18nextLng");
  const { topic } = useSelector((state: RootState) => state.notification);
  useEffect(() => {
    execute.defaults.headers.lang = language;
  }, []);
  useEffect(() => {
    const getTopic = async () => {
      if (isLoggedIn) {
        dispatch(fetchGetTopicNotification());
      }
    };
    getTopic();
  }, [isLoggedIn]);

  useEffect(() => {
    const pushNotificationCount = () => dispatch(incressCountNotification());
    if (isLoggedIn && topic) {
      subscribeToTopic(topic, pushNotificationCount);
    }
  }, [topic, isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full font-kanit">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("scm_admin")}</title>
        </Helmet>
        <BrowserRouter>
          <PageLayout>
            <Switch>
              {!isLoggedIn ? (
                <Redirect from="/" to="/signin" exact />
              ) : (
                <Redirect from="/" to={routesHomeDashboard} exact />
              )}
              <Route key="/signin" exact path="/signin" component={SignInForm} />
              <Route key="/signin-2fa" exact path="/signin-2fa" component={SignIn2FAForm} />
              <Route
                key="/password-recovery-1"
                exact
                path="/password-recovery-1"
                component={PasswordRecovery1}
              />
              <Route
                key="/password-recovery-2"
                exact
                path="/password-recovery-2"
                component={PasswordRecovery2}
              />
              <Route
                key="/change-password"
                exact
                path="/change-password"
                component={ChangePasswordForm}
              />
              {routesConfig.map(({ path, exact, component: Component }) => (
                <PrivateRoute key={path} exact={exact} path={path} component={Component} />
              ))}
              <Route
                key="/error-404-not-found"
                exact
                path="/error-404-not-found"
                component={Page404}
              />
              <Redirect from="*" to="/error-404-not-found" />
            </Switch>
          </PageLayout>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
