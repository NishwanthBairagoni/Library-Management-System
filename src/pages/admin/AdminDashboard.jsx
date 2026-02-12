import React from 'react';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
     const [activeTab, setActiveTab] = React.useState('overview');

     const renderContent = () => {
          switch (activeTab) {
               case 'users':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Manage Users</h3>
                                   <button className="btn-primary">Add New User</button>
                              </div>
                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>ID</th>
                                                  <th>Name</th>
                                                  <th>Role</th>
                                                  <th>Status</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>#U-1023</td>
                                                  <td>Sarah Smith</td>
                                                  <td>Student</td>
                                                  <td><span style={{ color: 'var(--color-success)' }}>Active</span></td>
                                                  <td><button style={{ color: 'var(--color-accent-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button></td>
                                             </tr>
                                             <tr>
                                                  <td>#U-1025</td>
                                                  <td>James Wilson</td>
                                                  <td>Librarian</td>
                                                  <td><span style={{ color: 'var(--color-success)' }}>Active</span></td>
                                                  <td><button style={{ color: 'var(--color-accent-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    );
               case 'books':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Manage Books</h3>
                                   <button className="btn-primary">Add New Book</button>
                              </div>
                              <input
                                   type="text"
                                   placeholder="Search inventory..."
                                   style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '1rem', borderRadius: 'var(--radius-md)' }}
                              />
                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>ISBN</th>
                                                  <th>Title</th>
                                                  <th>Author</th>
                                                  <th>Stock</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>978-0131103627</td>
                                                  <td>The C Programming Language</td>
                                                  <td>Dennis Ritchie</td>
                                                  <td>5</td>
                                                  <td><button style={{ color: 'var(--color-accent-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    );
               case 'reports':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                              <h3>System Reports</h3>
                              <p className="text-muted" style={{ margin: '2rem 0' }}>Report generation module coming soon.</p>
                              <div className="grid-cols-2">
                                   <div className="stat-card glass-panel">
                                        <h4>User Growth</h4>
                                        <div className="stat-value">+125</div>
                                        <p className="text-muted">New users this month</p>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <h4>Late Returns</h4>
                                        <div className="stat-value text-error" style={{ color: 'var(--color-error)' }}>15%</div>
                                        <p className="text-muted">Increase from last month</p>
                                   </div>
                              </div>
                         </section>
                    );
               default:
                    return (
                         <>
                              <section className="stats-grid">
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Total Users</div>
                                        <div className="stat-value">1,245</div>
                                        <div className="text-muted text-sm">+12% this week</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Total Books</div>
                                        <div className="stat-value">8,530</div>
                                        <div className="text-muted text-sm">Active Inventory</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Books Issued</div>
                                        <div className="stat-value">432</div>
                                        <div className="text-muted text-sm">Currently floating</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Overdue</div>
                                        <div className="stat-value text-error" style={{ color: 'var(--color-error)' }}>28</div>
                                        <div className="text-muted text-sm">Action needed</div>
                                   </div>
                              </section>

                              <section className="recent-activity glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                   <h3>Recent Registrations</h3>
                                   <div className="table-container">
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>User ID</th>
                                                       <th>Name</th>
                                                       <th>Role</th>
                                                       <th>Status</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr>
                                                       <td>#U-1023</td>
                                                       <td>Sarah Smith</td>
                                                       <td>Student</td>
                                                       <td><span style={{ color: 'var(--color-success)' }}>Active</span></td>
                                                  </tr>
                                                  <tr>
                                                       <td>#U-1024</td>
                                                       <td>Mike Johnson</td>
                                                       <td>Librarian</td>
                                                       <td><span style={{ color: 'var(--color-warning)' }}>Pending</span></td>
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
                    <a href="/" className="sidebar-logo text-gradient">LibAdmin</a>
                    <nav className="sidebar-nav">
                         <button
                              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                              onClick={() => setActiveTab('overview')}
                         >
                              Overview
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                              onClick={() => setActiveTab('users')}
                         >
                              Manage Users
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'books' ? 'active' : ''}`}
                              onClick={() => setActiveTab('books')}
                         >
                              Manage Books
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                              onClick={() => setActiveTab('reports')}
                         >
                              Reports
                         </button>
                         <a href="/" className="nav-item" style={{ marginTop: 'auto' }}>Logout</a>
                    </nav>
               </aside>

               <main className="main-content">
                    <header className="topbank-header">
                         <h2>Admin Dashboard</h2>
                         <div className="user-profile">Admin User</div>
                    </header>

                    {renderContent()}
               </main>
          </div>
     );
};

export default AdminDashboard;
