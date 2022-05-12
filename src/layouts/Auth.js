import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "views/auth/Login";
import { AuthProvider } from "context/AuthProvider";

export default function Auth() {
  return (
    <>
      <Switch>
        <AuthProvider>
          <Route path="/auth/login" exact component={Login} />
          <Redirect from="/auth" to="/auth/login" />
        </AuthProvider>
      </Switch>
    </>
  );
}
