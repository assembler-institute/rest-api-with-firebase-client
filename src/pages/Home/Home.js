/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import withLayout from "../../hoc/withLayout";
import { signOut } from "../../services/auth";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <>
      <h1 className="text-white mb-4">Home</h1>
      {currentUser && (
        <div className="d-flex flex-column">
          <h4 className="text-white fw-normal">Hello, {currentUser.email}!</h4>
          <Button variant="danger" onClick={handleSignOut}>
            Log out
          </Button>
        </div>
      )}
      {!currentUser && (
        <div className="d-flex">
          <h4 className="text-white mx-2 fw-normal">Hi, please</h4>
          <Link className="bg-white nav-link rounded" to="/login">
            Sign in
          </Link>
        </div>
      )}
    </>
  );
}

export default withLayout(Home);
