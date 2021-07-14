import React from "react";
import { Row, Col } from "react-bootstrap";

import "./withLayout.css";

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <main className="container-fluid bg-dark">
          <Row className="h-100">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <WrappedComponent />
            </Col>
          </Row>
        </main>
      </>
    );
  }

  return WrapperComponent;
}

export default withLayout;
