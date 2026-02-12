import React from 'react';
import '../../styles/Dashboard.css';

const StudentDashboard = () => {
     const [activeTab, setActiveTab] = React.useState('dashboard');

     const renderContent = () => {
          switch (activeTab) {
               case 'search':
                    return (
                         <section className="search-section glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <h3>Search Books</h3>
                              <input
                                   type="text"
                                   placeholder="Search for books, authors, or ISBN..."
                                   style={{
                                        width: '100%',
                                        padding: '1rem',
                                        marginTop: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: 'var(--color-text-primary)'
                                   }}
                              />
                              <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                   <p>Start typing to search the library catalog...</p>
                              </div>
                         </section>
                    );
               case 'history':
                    return (
                         <section className="recent-activity glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <h3>Borrowing History</h3>
                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>Book Title</th>
                                                  <th>Borrowed Date</th>
                                                  <th>Returned Date</th>
                                                  <th>Status</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>Introduction to Algorithms</td>
                                                  <td>Sep 10, 2026</td>
                                                  <td>Sep 24, 2026</td>
                                                  <td><span style={{ color: 'var(--color-text-muted)' }}>Returned</span></td>
                                             </tr>
                                             <tr>
                                                  <td>Clean Code</td>
                                                  <td>Aug 15, 2026</td>
                                                  <td>Aug 20, 2026</td>
                                                  <td><span style={{ color: 'var(--color-text-muted)' }}>Returned</span></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    );
               case 'profile':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <h3>My Profile</h3>
                              <div className="grid-cols-2">
                                   <div>
                                        <p className="text-muted">Name</p>
                                        <p className="text-lg">Alex Johnson</p>
                                   </div>
                                   <div>
                                        <p className="text-muted">Student ID</p>
                                        <p className="text-lg">#ST-2024-001</p>
                                   </div>
                                   <div>
                                        <p className="text-muted">Email</p>
                                        <p className="text-lg">alex.j@uni.edu</p>
                                   </div>
                                   <div>
                                        <p className="text-muted">Department</p>
                                        <p className="text-lg">Computer Science</p>
                                   </div>
                              </div>
                         </section>
                    );
               default:
                    return (
                         <>
                              <section className="stats-grid">
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Books Borrowed</div>
                                        <div className="stat-value">3</div>
                                        <div className="text-muted text-sm">Due in 5 days</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Fines Due</div>
                                        <div className="stat-value">$0.00</div>
                                        <div className="text-muted text-sm" style={{ color: 'var(--color-success)' }}>Good standing</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Reserved</div>
                                        <div className="stat-value">1</div>
                                        <div className="text-muted text-sm">Ready for pickup</div>
                                   </div>
                              </section>

                              <section className="recent-activity glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                   <h3>Currently Borrowed</h3>
                                   <div className="table-container">
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>Book Title</th>
                                                       <th>Author</th>
                                                       <th>Due Date</th>
                                                       <th>Status</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr>
                                                       <td>Advanced React Patterns</td>
                                                       <td>Arek Nawo</td>
                                                       <td>Oct 24, 2026</td>
                                                       <td><span style={{ color: 'var(--color-success)' }}>On Time</span></td>
                                                  </tr>
                                                  <tr>
                                                       <td>System Design Interview</td>
                                                       <td>Alex Xu</td>
                                                       <td>Oct 20, 2026</td>
                                                       <td><span style={{ color: 'var(--color-warning)' }}>Due Soon</span></td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </section>
                         </>
                    );
          }
     };

     return (
          <div className="dashboard-container">
               <aside className="sidebar">
                    <a href="/" className="sidebar-logo text-gradient">LibStudent</a>
                    <nav className="sidebar-nav">
                         <button
                              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                              onClick={() => setActiveTab('dashboard')}
                         >
                              My Dashboard
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
                              onClick={() => setActiveTab('search')}
                         >
                              Search Books
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                              onClick={() => setActiveTab('history')}
                         >
                              Borrow History
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                              onClick={() => setActiveTab('profile')}
                         >
                              Profile
                         </button>
                         <a href="/" className="nav-item" style={{ marginTop: 'auto' }}>Logout</a>
                    </nav>
               </aside>

               <main className="main-content">
                    <header className="topbank-header">
                         <h2>Student Dashboard</h2>
                         <div className="user-profile">Welcome, Alex</div>
                    </header>

                    {renderContent()}
               </main>
          </div>
     );
};

export default StudentDashboard;
