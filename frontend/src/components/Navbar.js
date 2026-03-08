import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f8f8f8" }}>
      <Link to="/">Login</Link> {" | "}
      <Link to="/register">Register</Link> {" | "}
      <Link to="/prompts">Prompts</Link> {" | "}
      <Link to="/generate">Generate</Link>
    </nav>
  );
}