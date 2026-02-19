import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [role, setRole] = useState("student");

  return (
    <div className="home-container">
      <h1 className="home-title">Library Management System</h1>
      <p className="home-subtitle">Choose your role to continue</p>

      {/* Role Tabs */}
      <div className="home-tabs">
        <button
          className={`tab ${role === "student" ? "active" : ""}`}
          onClick={() => setRole("student")}
        >
          Student
        </button>

        <button
          className={`tab ${role === "librarian" ? "active" : ""}`}
          onClick={() => setRole("librarian")}
        >
          Librarian
        </button>

        <button
          className={`tab ${role === "staff" ? "active" : ""}`}
          onClick={() => setRole("staff")}
        >
          Staff
        </button>
      </div>

      {/* Login / Register */}
      <div className="home-actions">
        <Link to={`/${role}/login`} className="action-btn login">
          Login
        </Link>

        <Link to={`/${role}/register`} className="action-btn register">
          Register
        </Link>
      </div>

      <div className="home-footer">
        © 2026 Library Management System
      </div>
    </div>
  );
}

export default Home;
