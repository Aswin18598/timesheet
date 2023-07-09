import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error d-flex flex-column align-items-center justify-content-center">
      <h1 className="title">Oops!</h1>
      <h3 className="fs-12 fw-bold">404-PAGE NOT FOUND</h3>
      <p className="content">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable
      </p>
      <Button onClick={() => navigate("/")}>GO TO HOME</Button>
    </div>
  );
}

export default NotFound;
