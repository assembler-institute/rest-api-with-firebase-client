import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import "./styles/App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AuthContext from "./context/AuthContext";
import { auth } from "./services/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
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
    };
  }, [currentUser]);

  return (
    <div className="App">
      <AuthContext.Provider value={currentUser}>
        <Switch>
          <Route
            path="/home"
            exact
            render={(routeProps) => <Home {...routeProps} />}
          />
          <Route path="/" render={(routeProps) => <Login {...routeProps} />} />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
