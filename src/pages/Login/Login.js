/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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

  async function handleLoginWithGoogleClick(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithGoogle();
      await syncUserData();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card id="loginContainer" className="flex-column p-1">
        <Card.Title className="font-weight-bold text-uppercase m-0">
          Login
        </Card.Title>
        <Card.Body>
          <Form className="">
            <Form.Group controlId="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mt-2" controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className="w-100 mt-2" variant="success" type="submit">
              Submit
            </Button>
          </Form>
          <div className="d-flex flex-column mt-4">
            <Button variant="primary mb-1">Login with Google</Button>
            <Button variant="danger">Forgot your password</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default withLayout(Login);
