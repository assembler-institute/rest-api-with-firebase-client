/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import withLayout from "../../hoc/withLayout";
import { syncUserData } from "../../utils/auth-request";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../services/auth";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLoginWithGoogle(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await signUpWithEmailAndPassword(email, password);
      // await syncUserData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card id="registerContainer" className="flex-column p-1">
        <Card.Title className="font-weight-bold text-uppercase m-0">
          Registration
        </Card.Title>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {error && <p className="mt-2 form-label text-danger">{error}</p>}
            <Button className="w-100 mt-2" variant="success" type="submit">
              Submit
            </Button>
          </Form>
          <div className="d-flex mt-2">
            {loading && <p>Loading...</p>}
            {!loading && !error && <p>Sign Up Success</p>}
          </div>
          <div className="d-flex flex-column mt-2">
            <Button variant="primary mb-1" onClick={handleLoginWithGoogle}>
              Sign Up with Google
            </Button>
            <div className="w-full d-flex">
              <Link
                className="btn btn-dark flex-grow-1"
                variant="info"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default withLayout(Register);
