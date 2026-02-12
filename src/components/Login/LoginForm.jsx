import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ role }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const navigate = useNavigate();

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log(`Login Attempt - Role: ${role}, Email: ${email}, Password: ${password}`);

          // Simulate simple login redirection
          let targetPath = "/";
          if (role.toLowerCase() === "student") targetPath = "/student/dashboard";
          else if (role.toLowerCase() === "librarian") targetPath = "/librarian/dashboard";
          else targetPath = "/admin/dashboard"; // Default for Admin/Staff

          navigate(targetPath);
     };

     return (
          <div className="login-form-container">
               <h2 className="login-title">{role} Login</h2>
               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label>Email</label>
                         <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="Enter your email"
                         />
                    </div>
                    <div className="form-group">
                         <label>Password</label>
                         <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              placeholder="Enter your password"
                         />
                    </div>
                    <button type="submit" className="login-btn">Login</button>

                    <div className="register-link">
                         <p>Don't have an account? <Link to={`/${role.toLowerCase()}/register`}>Register here</Link></p>
                    </div>
               </form>
          </div>
     );
};

export default LoginForm;
