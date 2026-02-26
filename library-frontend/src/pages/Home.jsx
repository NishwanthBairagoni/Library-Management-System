import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [role, setRole] = useState("student");

  return (
    <div className="home-container">
      <h1 className="home-title">Library Management System</h1>
      <p className="home-subtitle">Choose your role to continue</p>

      <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*6Jp3vJWe7VFlFHZ9WhSJng.jpeg"
          alt="Library System"
          style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' }}
        />
      </div>

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
