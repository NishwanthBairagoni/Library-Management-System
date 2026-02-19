import React from 'react';
import Navbar from '../components/common/Navbar';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
     return (
          <div className="landing-page">
               <Navbar />

               {/* Hero Section */}
               <section className="hero-section">
                    <div className="hero-bg"></div>
                    <div className="hero-content">
                         <h1 className="hero-title">
                              The Future of <span className="text-gradient">Library Management</span>
                         </h1>
                         <p className="hero-subtitle">
                              Experience a seamless, digital library ecosystem. Manage books, track inventory, and empower students with our next-gen platform.
                         </p>
                         <div className="flex-center" style={{ gap: '1rem' }}>
                              <a href="#roles" className="btn-primary">Get Started</a>
                              <a href="#features" className="nav-link" style={{ padding: '0.75rem 1.5rem' }}>Learn More</a>
                         </div>
                    </div>
               </section>

               {/* Features Section */}
               <section id="features" className="features-section">
                    <div className="container">
                         <h2 className="section-title">Why Choose <span className="text-gradient">LibManager</span>?</h2>
                         <div className="grid-cols-3">
                              <div className="feature-card glass-panel">
                                   <div className="feature-icon">📚</div>
                                   <h3>Smart Inventory</h3>
                                   <p className="text-muted">Real-time tracking of thousands of books with smart categorization and search.</p>
                              </div>
                              <div className="feature-card glass-panel">
                                   <div className="feature-icon">⚡</div>
                                   <h3>Fast Operations</h3>
                                   <p className="text-muted">Issue and return books in seconds. Optimized workflows for librarians.</p>
                              </div>
                              <div className="feature-card glass-panel">
                                   <div className="feature-icon">📊</div>
                                   <h3>Insightful Analytics</h3>
                                   <p className="text-muted">Visualize borrowing trends and user activity with detailed dashboards.</p>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Role Selection Section */}
               <section id="roles" className="role-selection-section">
                    <div className="container">
                         <h2 className="section-title">Select Your <span className="text-gradient">Role</span> to Login or Register</h2>
                         <div className="grid-cols-3">
                              <Link to="/admin/login" style={{ textDecoration: 'none' }}>
                                   <div className="role-card glass-panel">
                                        <div className="feature-icon">🛡️</div>
                                        <h3>Admin</h3>
                                        <p>Manage users, system settings, and view reports.</p>
                                   </div>
                              </Link>

                              <Link to="/librarian/login" style={{ textDecoration: 'none' }}>
                                   <div className="role-card glass-panel">
                                        <div className="feature-icon">📖</div>
                                        <h3>Librarian</h3>
                                        <p>Manage book inventory, issue books, and handle returns.</p>
                                   </div>
                              </Link>

                              <Link to="/student/login" style={{ textDecoration: 'none' }}>
                                   <div className="role-card glass-panel">
                                        <div className="feature-icon">🎓</div>
                                        <h3>Student</h3>
                                        <p>Search books, check history, and manage your profile.</p>
                                   </div>
                              </Link>
                         </div>
                    </div>
               </section>

               {/* Footer */}
               <footer className="footer">
                    <p>© 2026 LibManager System. All rights reserved.</p>
               </footer>
          </div>
     );
};

export default LandingPage;
