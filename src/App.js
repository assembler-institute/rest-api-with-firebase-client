import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import "./styles/App.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import { auth } from "./services/auth";
import { AuthProvider } from "./context/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    /* unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    }; */
  }, [currentUser]);

  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <Route
            path="/login"
            exact
            render={(routeProps) => <Login {...routeProps} />}
          />
          <Route
            path="/sign-up"
            exact
            render={(routeProps) => <Register {...routeProps} />}
          />
          <Route
            path="/reset-password"
            exact
            render={(routeProps) => <ResetPassword {...routeProps} />}
          />
          <Route path="/" render={(routeProps) => <Home {...routeProps} />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
