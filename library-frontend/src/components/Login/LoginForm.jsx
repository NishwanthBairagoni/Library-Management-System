import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ role }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          console.log(`Login Attempt - Role: ${role}, Email: ${email}, Password: ${password}`);

          try {
               const response = await import('../../services/api').then(module => module.login(email, password, role));
               const user = response.data;

               // Store user in local storage (including token if backend provided one, currently just user object)
               localStorage.setItem('user', JSON.stringify(user));

               alert(`Login Successful as ${user.role}`);

               // Redirect based on backend role or expected role
               let targetPath = "/";
               const userRole = user.role ? user.role.toLowerCase() : role.toLowerCase();

               if (userRole === "student" || userRole === "user") targetPath = "/student/dashboard";
               else if (userRole === "librarian") targetPath = "/librarian/dashboard";
               else targetPath = "/admin/dashboard"; // Default for Admin/Staff

               navigate(targetPath);
          } catch (error) {
               console.error("Login failed:", error);
               if (error.response && error.response.status === 403) {
                    alert("Login failed: Account is PENDING approval from Admin.");
               } else {
                    alert("Login failed: " + (error.response?.data || "Invalid credentials"));
               }
          }
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
