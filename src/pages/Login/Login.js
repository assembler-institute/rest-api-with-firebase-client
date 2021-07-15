/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import withLayout from "../../hoc/withLayout";
import { syncUserData } from "../../utils/auth-request";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "../../services/auth";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLoginWithGoogle(e) {
    e.preventDefault();

    setLoading(true);
    setLoggedIn(false);

    try {
      await signInWithGoogle();
      await syncUserData();
      setLoggedIn(true);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setLoggedIn(false);

    try {
      await signInWithEmailAndPassword(email, password);
      await syncUserData();
      setLoggedIn(true);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card id="loginContainer" className="flex-column p-1">
        <Card.Title className="font-weight-bold text-uppercase m-0">
          Login
        </Card.Title>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {loginError && (
              <p className="mt-2 form-label text-danger">{loginError}</p>
            )}
            <Button className="w-100 mt-2" variant="success" type="submit">
              Submit
            </Button>
          </Form>
          <div className="d-flex flex-column mt-4">
            <Button variant="primary mb-1" onClick={handleLoginWithGoogle}>
              Login with Google
            </Button>
            <div className="w-full d-flex">
              <Link
                className="btn btn-dark flex-grow-1 me-2"
                variant="info"
                to="/sign-up"
              >
                Sign Up
              </Link>
              <Link
                className="btn btn-danger flex-grow-1"
                variant="danger"
                to="/reset-password"
              >
                Forgot your password
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default withLayout(Login);
