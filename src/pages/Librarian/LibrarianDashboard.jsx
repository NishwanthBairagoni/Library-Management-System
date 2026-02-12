import React from 'react';
import '../../styles/Dashboard.css';

const LibrarianDashboard = () => {
     const [activeTab, setActiveTab] = React.useState('dashboard');

     const renderContent = () => {
          switch (activeTab) {
               case 'issue':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', margin: '0 auto' }}>
                              <h3>Issue Book</h3>
                              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Student ID</label>
                                        <input
                                             type="text"
                                             placeholder="e.g. ST-2024-001"
                                             className="input-field"
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(255,255,255,0.05)',
                                                  color: 'white'
                                             }}
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Book ISBN / ID</label>
                                        <input
                                             type="text"
                                             placeholder="Scan or type ISBN"
                                             className="input-field"
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(255,255,255,0.05)',
                                                  color: 'white'
                                             }}
                                        />
                                   </div>
                                   <button className="btn-primary" style={{ marginTop: '1rem' }}>Confirm Issue</button>
                              </form>
                         </section>
                    );
               case 'return':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', margin: '0 auto' }}>
                              <h3>Return Book</h3>
                              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Book ISBN / ID</label>
                                        <input
                                             type="text"
                                             placeholder="Scan or type ISBN"
                                             className="input-field"
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(255,255,255,0.05)',
                                                  color: 'white'
                                             }}
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Condition</label>
                                        <select
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(30, 41, 59, 0.9)',
                                                  color: 'white'
                                             }}
                                        >
                                             <option>Good</option>
                                             <option>Damaged</option>
                                             <option>Lost</option>
                                        </select>
                                   </div>
                                   <button className="btn-primary" style={{ marginTop: '1rem', background: 'linear-gradient(135deg, var(--color-accent-tertiary), var(--color-success))' }}>Confirm Return</button>
                              </form>
                         </section>
                    );
               case 'inventory':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Book Inventory</h3>
                                   <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className="btn-primary">Add Book</button>
                                        <button style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer' }}>Filter</button>
                                   </div>
                              </div>
                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>Title</th>
                                                  <th>Author</th>
                                                  <th>ISBN</th>
                                                  <th>Status</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>The Great Gatsby</td>
                                                  <td>F. Scott Fitzgerald</td>
                                                  <td>978-0743273565</td>
                                                  <td><span style={{ color: 'var(--color-success)' }}>Available</span></td>
                                                  <td><button style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>View</button></td>
                                             </tr>
                                             <tr>
                                                  <td>1984</td>
                                                  <td>George Orwell</td>
                                                  <td>978-0451524935</td>
                                                  <td><span style={{ color: 'var(--color-warning)' }}>Issued</span></td>
                                                  <td><button style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>View</button></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    );
               default:
                    return (
                         <>
                              <section className="stats-grid">
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Issues Today</div>
                                        <div className="stat-value">45</div>
                                        <div className="text-muted text-sm">Busy day</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Returns Today</div>
                                        <div className="stat-value">32</div>
                                        <div className="text-muted text-sm">Processing...</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Pending Requests</div>
                                        <div className="stat-value text-warning" style={{ color: 'var(--color-warning)' }}>12</div>
                                        <div className="text-muted text-sm">Needs approval</div>
                                   </div>
                              </section>

                              <div className="grid-cols-2" style={{ marginTop: 'var(--spacing-xl)' }}>
                                   <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                        <h3>Quick Issue</h3>
                                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                             <input
                                                  type="text"
                                                  placeholder="Student ID"
                                                  className="input-field"
                                                  style={{
                                                       padding: '0.8rem',
                                                       borderRadius: 'var(--radius-md)',
                                                       border: '1px solid var(--glass-border)',
                                                       background: 'rgba(255,255,255,0.05)',
                                                       color: 'white'
                                                  }}
                                             />
                                             <input
                                                  type="text"
                                                  placeholder="ISBN"
                                                  className="input-field"
                                                  style={{
                                                       padding: '0.8rem',
                                                       borderRadius: 'var(--radius-md)',
                                                       border: '1px solid var(--glass-border)',
                                                       background: 'rgba(255,255,255,0.05)',
                                                       color: 'white'
                                                  }}
                                             />
                                             <button className="btn-primary" style={{ marginTop: '0.5rem' }}>Issue Book</button>
                                        </form>
                                   </section>

                                   <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                        <h3>Recent Transactions</h3>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                             <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                                                  <div style={{ fontWeight: 600 }}>Harry Potter (Issue)</div>
                                                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>To: John Doe • 2 mins ago</div>
                                             </li>
                                             <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                                                  <div style={{ fontWeight: 600 }}>Calculus 101 (Return)</div>
                                                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>From: Jane Smith • 15 mins ago</div>
                                             </li>
                                        </ul>
                                   </section>
                              </div>
                         </>
                    );
          }
     };

     return (
          <div className="dashboard-container">
               <aside className="sidebar">
                    <a href="/" className="sidebar-logo text-gradient">LibStaff</a>
                    <nav className="sidebar-nav">
                         <button
                              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                              onClick={() => setActiveTab('dashboard')}
                         >
                              Dashboard
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'issue' ? 'active' : ''}`}
                              onClick={() => setActiveTab('issue')}
                         >
                              Issue Book
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'return' ? 'active' : ''}`}
                              onClick={() => setActiveTab('return')}
                         >
                              Return Book
                         </button>
                         <button
                              className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
                              onClick={() => setActiveTab('inventory')}
                         >
                              Inventory
                         </button>
                         <a href="/" className="nav-item" style={{ marginTop: 'auto' }}>Logout</a>
                    </nav>
               </aside>

               <main className="main-content">
                    <header className="topbank-header">
                         <h2>Librarian Dashboard</h2>
                         <div className="user-profile">Staff Panel</div>
                    </header>

                    {renderContent()}
               </main>
          </div>
     );
};

export default LibrarianDashboard;
