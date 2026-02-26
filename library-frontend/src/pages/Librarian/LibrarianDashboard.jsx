import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import { getAllBooks, issueBook, returnBook, getDashboardStats, getActiveIssues, getPendingUsers, getApprovedUsers, approveUser, rejectUser, deleteUser, assignMembership } from '../../services/api';
import { getAllPlans } from '../../services/membershipService';
import MembershipManagement from '../admin/MembershipManagement';

const LibrarianDashboard = () => {
     const [activeTab, setActiveTab] = useState('dashboard');
     const [books, setBooks] = useState([]);
     const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0, activeIssues: 0 });
     const [activeIssuesList, setActiveIssuesList] = useState([]);
     const [issueData, setIssueData] = useState({ studentId: '', bookId: '' });
     const [returnData, setReturnData] = useState({ bookId: '', studentId: '' }); // Added studentId for robust return
     const [searchQuery, setSearchQuery] = useState('');
     const [filterAttribute, setFilterAttribute] = useState('category');
     const [pendingUsers, setPendingUsers] = useState([]);
     const [approvedUsers, setApprovedUsers] = useState([]);
     const [membershipPlans, setMembershipPlans] = useState([]);
     const [showAssignModal, setShowAssignModal] = useState(false);
     const [selectedUserForPlan, setSelectedUserForPlan] = useState(null);
     const [selectedPlanId, setSelectedPlanId] = useState('');

     useEffect(() => {
          if (activeTab === 'dashboard') {
               fetchStats();
          } else if (activeTab === 'inventory') {
               fetchBooks();
          } else if (activeTab === 'return') {
               fetchActiveIssues();
          } else if (activeTab === 'memberships') {
               fetchApprovedUsers();
               fetchPlans();
          }
     }, [activeTab]);

     const fetchStats = async () => {
          try {
               const response = await getDashboardStats();
               // Filter or use general stats
               setStats(response.data);
          } catch (error) {
               console.error("Error fetching stats:", error);
          }
     };

     const fetchBooks = async () => {
          try {
               const response = await getAllBooks();
               setBooks(response.data);
          } catch (error) {
               console.error("Error fetching books:", error);
          }
     };

     const fetchActiveIssues = async () => {
          try {
               const response = await getActiveIssues();
               setActiveIssuesList(response.data);
          } catch (error) {
               console.error("Error fetching active issues:", error);
          }
     };

     const handleIssue = async (e) => {
          e.preventDefault();
          try {
               // Note: Backend expects IDs, but input might be "ST-..." or ISBN. 
               // For this demo, assuming user inputs raw IDs for simplicity, 
               // OR we need a lookup. Let's assume raw IDs for the quick fix as per user request for "Real Data" flow.
               await issueBook(issueData.studentId, issueData.bookId);
               alert("Book Issued Successfully!");
               setIssueData({ studentId: '', bookId: '' });
          } catch (error) {
               console.error("Issue failed:", error);
               alert("Failed to issue book. Check IDs and Stock.");
          }
     };

     const handleReturn = async (studentId, bookId) => {
          if (window.confirm("Confirm return for this book?")) {
               try {
                    await returnBook(studentId, bookId);
                    alert("Book Returned Successfully!");
                    fetchActiveIssues(); // Refresh list
                    fetchStats(); // Update stats
               } catch (error) {
                    console.error("Return failed:", error);
                    alert("Failed to return book. Check details.");
               }
          }
     };

     const fetchPendingUsers = async () => {
          try {
               const response = await getPendingUsers();
               setPendingUsers(response.data);
          } catch (error) {
               console.error("Error fetching pending users:", error);
          }
     };

     const fetchApprovedUsers = async () => {
          try {
               const response = await getApprovedUsers();
               setApprovedUsers(response.data);
          } catch (error) {
               console.error("Error fetching approved users:", error);
          }
     };

     const fetchPlans = async () => {
          try {
               const response = await getAllPlans();
               setMembershipPlans(response.data.filter(plan => plan.active));
          } catch (error) {
               console.error("Error fetching plans:", error);
          }
     };

     const handleApprove = async (userId) => {
          try {
               await approveUser(userId);
               alert("User Approved!");
               fetchPendingUsers();
               fetchApprovedUsers();
          } catch (error) {
               console.error("Error approving user:", error);
          }
     };

     const handleReject = async (userId) => {
          if (window.confirm("Are you sure you want to reject this user?")) {
               try {
                    await rejectUser(userId);
                    alert("User Rejected!");
                    fetchPendingUsers();
               } catch (error) {
                    console.error("Error rejecting user:", error);
               }
          }
     };

     const handleDeleteUser = async (userId) => {
          if (window.confirm("Are you sure you want to delete this user?")) {
               try {
                    await deleteUser(userId);
                    alert("User Deleted!");
                    fetchApprovedUsers();
               } catch (error) {
                    console.error("Error deleting user:", error);
               }
          }
     };

     const handleAssignClick = (user) => {
          setSelectedUserForPlan(user);
          setShowAssignModal(true);
     };

     const submitAssignMembership = async (e) => {
          e.preventDefault();
          if (!selectedPlanId) return alert("Please select a plan");
          try {
               await assignMembership(selectedUserForPlan.id, selectedPlanId);
               alert("Membership assigned successfully!");
               setShowAssignModal(false);
               setSelectedUserForPlan(null);
               setSelectedPlanId('');
               fetchApprovedUsers();
          } catch (error) {
               console.error("Error assigning membership:", error);
               alert("Failed to assign membership");
          }
     };

     const renderContent = () => {
          const filteredBooks = books.filter(book => {
               if (!searchQuery) return true;
               const value = book[filterAttribute];
               if (value == null) return false;
               return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
          });

          switch (activeTab) {
               case 'issue':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', margin: '0 auto' }}>
                              <h3>Issue Book</h3>
                              <form onSubmit={handleIssue} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Student User ID</label>
                                        <input
                                             type="text"
                                             placeholder="e.g. 5f8d04b3..."
                                             className="input-field"
                                             value={issueData.studentId}
                                             onChange={(e) => setIssueData({ ...issueData, studentId: e.target.value })}
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(255,255,255,0.05)',
                                                  color: 'white'
                                             }}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Book ID</label>
                                        <input
                                             type="text"
                                             placeholder="e.g. 5f8d04b3..."
                                             className="input-field"
                                             value={issueData.bookId}
                                             onChange={(e) => setIssueData({ ...issueData, bookId: e.target.value })}
                                             style={{
                                                  width: '100%',
                                                  padding: '0.8rem',
                                                  borderRadius: 'var(--radius-md)',
                                                  border: '1px solid var(--glass-border)',
                                                  background: 'rgba(255,255,255,0.05)',
                                                  color: 'white'
                                             }}
                                             required
                                        />
                                   </div>
                                   <button className="btn-primary" style={{ marginTop: '1rem' }}>Confirm Issue</button>
                              </form>
                         </section>
                    );
               case 'return':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Active Issues & Returns</h3>
                                   <button onClick={fetchActiveIssues} className="btn-primary">Refresh</button>
                              </div>
                              <p className="text-muted" style={{ marginBottom: '1rem' }}>
                                   Below is a list of all currently issued books. Click "Return" to process a return.
                              </p>

                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>Issue ID</th>
                                                  <th>Student</th>
                                                  <th>Book</th>
                                                  <th>Issue Date</th>
                                                  <th>Return Deadline</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {activeIssuesList.length === 0 ? (
                                                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>No active book issues found.</td></tr>
                                             ) : (
                                                  activeIssuesList.map(issue => (
                                                       <tr key={issue.id}>
                                                            <td>#{issue.id}</td>
                                                            <td>
                                                                 <div>{issue.user.email}</div>
                                                                 <small className="text-muted">ID: {issue.user.id}</small>
                                                            </td>
                                                            <td>
                                                                 <div>{issue.book.title}</div>
                                                                 <small className="text-muted">ID: {issue.book.id}</small>
                                                            </td>
                                                            <td>{issue.issueDate}</td>
                                                            <td>
                                                                 <span style={{ color: new Date(issue.returnDate) < new Date() ? 'var(--color-error)' : 'inherit' }}>
                                                                      {issue.returnDate}
                                                                 </span>
                                                            </td>
                                                            <td>
                                                                 <button
                                                                      className="btn-primary"
                                                                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', background: 'var(--color-success)' }}
                                                                      onClick={() => handleReturn(issue.user.id, issue.book.id)}
                                                                 >
                                                                      Return
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    );
               case 'memberships':
                    return (
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                              <MembershipManagement />
                              <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3>Active Users Memberships</h3>
                                        <button className="btn-primary" onClick={() => { fetchApprovedUsers(); }}>Refresh</button>
                                   </div>

                                   <h4 style={{ marginBottom: '1rem', color: 'var(--color-success)' }}>Active Members</h4>
                                   <div className="table-container">
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>Email</th>
                                                       <th>Role</th>
                                                       <th>Status</th>
                                                       <th>Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {approvedUsers.length === 0 ? (
                                                       <tr><td colSpan="5" style={{ textAlign: 'center' }}>No active users found.</td></tr>
                                                  ) : (
                                                       approvedUsers.map(user => (
                                                            <tr key={user.id}>
                                                                 <td>#U-{user.id}</td>
                                                                 <td>{user.email}</td>
                                                                 <td>{user.role}</td>
                                                                 <td><span style={{ color: 'var(--color-success)' }}>{user.status}</span></td>
                                                                 <td>{user.membershipType || 'Standard'}</td>
                                                                 <td>
                                                                      <button
                                                                           onClick={() => handleAssignClick(user)}
                                                                           style={{ color: 'var(--color-accent-secondary)', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                                                      >
                                                                           Assign Plan
                                                                      </button>
                                                                      <button
                                                                           onClick={() => handleDeleteUser(user.id)}
                                                                           style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                                                      >
                                                                           Revoke
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                              </section>
                         </div>
                    );
               case 'inventory':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Book Inventory</h3>
                              </div>
                              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                   <select
                                        value={filterAttribute}
                                        onChange={(e) => setFilterAttribute(e.target.value)}
                                        className="input-field"
                                        style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', minWidth: '150px' }}
                                   >
                                        <option value="category" style={{ color: 'black' }}>Category</option>
                                        <option value="title" style={{ color: 'black' }}>Title</option>
                                        <option value="author" style={{ color: 'black' }}>Author</option>
                                        <option value="isbn" style={{ color: 'black' }}>ISBN</option>
                                        <option value="publisher" style={{ color: 'black' }}>Publisher</option>
                                   </select>
                                   <input
                                        type="text"
                                        placeholder={`Search by ${filterAttribute}...`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: 'var(--radius-md)' }}
                                   />
                              </div>
                              <div className="table-container">
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>ID</th>
                                                  <th>Title</th>
                                                  <th>Author</th>
                                                  <th>Category</th>
                                                  <th>Publisher</th>
                                                  <th>ISBN</th>
                                                  <th>Stock</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {filteredBooks.length === 0 ? (
                                                  <tr><td colSpan="7" style={{ textAlign: 'center' }}>No books found matching criteria.</td></tr>
                                             ) : (
                                                  filteredBooks.map(book => (
                                                       <tr key={book.id}>
                                                            <td>#B-{book.id}</td>
                                                            <td>{book.title}</td>
                                                            <td>{book.author}</td>
                                                            <td>{book.category || '-'}</td>
                                                            <td>{book.publisher || '-'}</td>
                                                            <td>{book.isbn}</td>
                                                            <td>
                                                                 <span style={{ color: book.quantity > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                                      {book.quantity > 0 ? book.quantity : 'Out of Stock'}
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  )))
                                             }
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
                                        <div className="stat-label">Active Issues</div>
                                        <div className="stat-value">{stats.activeIssues}</div>
                                        <div className="text-muted text-sm">Library wide</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Total Books</div>
                                        <div className="stat-value">{stats.totalBooks}</div>
                                        <div className="text-muted text-sm">In Collection</div>
                                   </div>
                              </section>

                              <div style={{ marginTop: '2rem' }}>
                                   <h3>Quick Actions</h3>
                                   <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button className="btn-primary" onClick={() => setActiveTab('issue')}>Issue Book</button>
                                        <button className="btn-primary" onClick={() => setActiveTab('return')}>Return Book</button>
                                   </div>
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
                         <button
                              className={`nav-item ${activeTab === 'memberships' ? 'active' : ''}`}
                              onClick={() => setActiveTab('memberships')}
                         >
                              Membership Management & Users
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
