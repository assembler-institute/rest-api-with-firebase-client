import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import withLayout from "../../hoc/withLayout";
import { sendPasswordResetEmail } from "../../services/auth";

import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setLoaded(false);

    try {
      await sendPasswordResetEmail(email);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }

  return (
    <>
      <Card id="resetContainer" className="flex-column p-1">
        <Card.Title className="font-weight-bold text-uppercase m-0">
          Reset Password
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
            {error && <p className="mt-2 form-label text-danger">{error}</p>}
            <Button
              className="w-100 mt-2"
              variant="success"
              type="submit"
              disable={loading || loaded}
            >
              Submit
            </Button>
          </Form>
          <div className="d-flex flex-column mt-4">
            <Link
              className="btn btn-dark flex-grow-1 me-2"
              variant="info"
              to="/login"
            >
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default withLayout(ResetPassword);
