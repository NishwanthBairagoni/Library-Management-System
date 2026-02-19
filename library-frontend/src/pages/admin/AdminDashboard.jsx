import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { getPendingUsers, approveUser, rejectUser, getApprovedUsers, deleteUser, getAllBooks, deleteBook, addBook, updateBook, getDashboardStats } from '../../services/api';

const AdminDashboard = () => {
     const [activeTab, setActiveTab] = useState('overview');
     const [pendingUsers, setPendingUsers] = useState([]);
     const [approvedUsers, setApprovedUsers] = useState([]);
     const [books, setBooks] = useState([]);
     const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0, activeIssues: 0, overdueBooks: 0 });
     const [loading, setLoading] = useState(false);
     const [showAddBook, setShowAddBook] = useState(false);
     const [isEditing, setIsEditing] = useState(false);
     const [currentBookId, setCurrentBookId] = useState(null);
     const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', quantity: 1, genre: '', publisher: '' });

     const navigate = useNavigate();

     useEffect(() => {
          if (activeTab === 'users') {
               fetchApprovedUsers();
          } else if (activeTab === 'requests') {
               fetchPendingUsers();
          } else if (activeTab === 'books') {
               fetchBooks();
          } else if (activeTab === 'overview' || activeTab === 'reports') {
               fetchStats();
          }
     }, [activeTab]);

     const fetchPendingUsers = async () => {
          setLoading(true);
          try {
               const response = await getPendingUsers();
               setPendingUsers(response.data);
          } catch (error) {
               console.error("Error fetching pending users:", error);
          } finally {
               setLoading(false);
          }
     };

     const fetchApprovedUsers = async () => {
          setLoading(true);
          try {
               const response = await getApprovedUsers();
               setApprovedUsers(response.data);
          } catch (error) {
               console.error("Error fetching approved users:", error);
          } finally {
               setLoading(false);
          }
     };

     const fetchBooks = async () => {
          setLoading(true);
          try {
               const response = await getAllBooks();
               setBooks(response.data);
          } catch (error) {
               console.error("Error fetching books:", error);
          } finally {
               setLoading(false);
          }
     };

     const fetchStats = async () => {
          try {
               const response = await getDashboardStats();
               setStats(response.data);
          } catch (error) {
               console.error("Error fetching stats:", error);
          }
     };

     const handleDeleteBook = async (bookId) => {
          if (window.confirm("Are you sure you want to delete this book?")) {
               try {
                    await deleteBook(bookId);
                    fetchBooks();
               } catch (error) {
                    console.error("Error deleting book:", error);
               }
          }
     };

     const handleAddBook = async (e) => {
          e.preventDefault();
          try {
               if (isEditing) {
                    await updateBook(currentBookId, newBook);
                    alert("Book updated successfully!");
               } else {
                    await addBook(newBook);
                    alert("Book added successfully!");
               }
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, genre: '', publisher: '' });
               setShowAddBook(false);
               setIsEditing(false);
               setCurrentBookId(null);
               fetchBooks();
          } catch (error) {
               console.error("Error saving book:", error);
               const action = isEditing ? "update" : "add";
               alert(`Failed to ${action} book. Ensure ISBN is unique.`);
          }
     };

     const handleEditClick = (book) => {
          setNewBook({
               title: book.title,
               author: book.author,
               isbn: book.isbn,
               title: book.title,
               author: book.author,
               isbn: book.isbn,
               quantity: book.quantity,
               genre: book.genre || '',
               publisher: book.publisher || ''
          });
          setCurrentBookId(book.id);
          setIsEditing(true);
          setShowAddBook(true);
     };

     const toggleAddBook = () => {
          if (showAddBook) {
               setShowAddBook(false);
               setIsEditing(false);
               setCurrentBookId(null);
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, genre: '', publisher: '' });
          } else {
               setShowAddBook(true);
               setIsEditing(false);
               setCurrentBookId(null);
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, genre: '', publisher: '' });
          }
     };

     const handleViewUser = (user) => {
          navigate(`/admin/user/${user.id}`);
     };

     const handleApprove = async (userId) => {
          try {
               await approveUser(userId);
               alert("User Approved!");
               fetchPendingUsers(); // Refresh list
          } catch (error) {
               console.error("Error approving user:", error);
               alert("Failed to approve user");
          }
     };

     const handleReject = async (userId) => {
          if (window.confirm("Are you sure you want to reject this user?")) {
               try {
                    await rejectUser(userId);
                    alert("User Rejected!");
                    fetchPendingUsers(); // Refresh list
               } catch (error) {
                    console.error("Error rejecting user:", error);
                    alert("Failed to reject user");
               }
          }
     };

     const handleDelete = async (userId) => {
          if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
               try {
                    await deleteUser(userId);
                    alert("User Deleted!");
                    fetchApprovedUsers(); // Refresh list
               } catch (error) {
                    console.error("Error deleting user:", error);
                    alert("Failed to delete user");
               }
          }
     };

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
                                   {loading ? <p>Loading...</p> : (
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>Email</th>
                                                       <th>Role</th>
                                                       <th>Status</th>
                                                       <th>Membership</th>
                                                       <th>Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {approvedUsers.length === 0 ? (
                                                       <tr><td colSpan="5">No active users found.</td></tr>
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
                                                                           onClick={() => handleDelete(user.id)}
                                                                           style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           Delete
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   )}
                              </div>
                         </section>
                    );
               case 'requests':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Pending Registration Requests</h3>
                                   <button className="btn-primary" onClick={fetchPendingUsers}>Refresh</button>
                              </div>

                              <div className="table-container">
                                   {loading ? <p>Loading...</p> : (
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>Email</th>
                                                       <th>Role</th>
                                                       <th>Status</th>
                                                       <th>Membership</th>
                                                       <th>Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {pendingUsers.length === 0 ? (
                                                       <tr><td colSpan="6">No pending requests found.</td></tr>
                                                  ) : (
                                                       pendingUsers.map(user => (
                                                            <tr key={user.id}>
                                                                 <td>#U-{user.id}</td>
                                                                 <td>{user.email}</td>
                                                                 <td>{user.role}</td>
                                                                 <td><span style={{ color: 'var(--color-warning)' }}>{user.status}</span></td>
                                                                 <td>{user.membershipType || 'Standard'}</td>
                                                                 <td>
                                                                      <button
                                                                           onClick={() => handleViewUser(user)}
                                                                           style={{ color: 'var(--color-accent-primary)', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           View
                                                                      </button>
                                                                      <button
                                                                           onClick={() => handleApprove(user.id)}
                                                                           style={{ color: 'var(--color-success)', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           Approve
                                                                      </button>
                                                                      <button
                                                                           onClick={() => handleReject(user.id)}
                                                                           style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           Reject
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   )}
                              </div>
                         </section>
                    );
               case 'books':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                   <h3>Manage Books</h3>
                                   <button className="btn-primary" onClick={toggleAddBook}>
                                        {showAddBook ? 'Cancel' : 'Add New Book'}
                                   </button>
                              </div>

                              {showAddBook && (
                                   <form onSubmit={handleAddBook} className="glass-panel" style={{ marginBottom: '1rem', padding: '1rem' }}>
                                        <h4 style={{ marginBottom: '1rem' }}>{isEditing ? 'Edit Book' : 'Add New Book'}</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                             <input
                                                  type="text"
                                                  placeholder="Title"
                                                  value={newBook.title}
                                                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                                  required
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                             <input
                                                  type="text"
                                                  placeholder="Author"
                                                  value={newBook.author}
                                                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                                  required
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                             <input
                                                  type="text"
                                                  placeholder="ISBN"
                                                  value={newBook.isbn}
                                                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                                                  required
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                             <input
                                                  type="text"
                                                  placeholder="Genre"
                                                  value={newBook.genre}
                                                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                             <input
                                                  type="text"
                                                  placeholder="Publisher"
                                                  value={newBook.publisher}
                                                  onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                             <input
                                                  type="number"
                                                  placeholder="Quantity"
                                                  value={newBook.quantity}
                                                  onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })}
                                                  min="1"
                                                  required
                                                  className="input-field"
                                                  style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                             />
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                                             {isEditing ? 'Update Book' : 'Save Book'}
                                        </button>
                                   </form>
                              )}
                              <input
                                   type="text"
                                   placeholder="Search inventory..."
                                   style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '1rem', borderRadius: 'var(--radius-md)' }}
                              />
                              <div className="table-container">
                                   {loading ? <p>Loading...</p> : (
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>ISBN</th>
                                                       <th>Title</th>
                                                       <th>Author</th>
                                                       <th>Genre</th>
                                                       <th>Publisher</th>
                                                       <th>Stock</th>
                                                       <th>Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {books.length === 0 ? (
                                                       <tr><td colSpan="8">No books found.</td></tr>
                                                  ) : (
                                                       books.map(book => (
                                                            <tr key={book.id}>
                                                                 <td>#B-{book.id}</td>
                                                                 <td>{book.isbn}</td>
                                                                 <td>{book.title}</td>
                                                                 <td>{book.author}</td>
                                                                 <td>{book.genre || '-'}</td>
                                                                 <td>{book.publisher || '-'}</td>
                                                                 <td>{book.quantity}</td>
                                                                 <td>
                                                                      <button
                                                                           onClick={() => handleEditClick(book)}
                                                                           style={{ color: 'var(--color-accent-secondary)', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           Edit
                                                                      </button>
                                                                      <button
                                                                           onClick={() => handleDeleteBook(book.id)}
                                                                           style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                                      >
                                                                           Delete
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  )}
                                             </tbody>
                                        </table>
                                   )}
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
                                        <div className="stat-value">{stats.totalUsers}</div>
                                        <div className="text-muted text-sm">Registered Accounts</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Total Books</div>
                                        <div className="stat-value">{stats.totalBooks}</div>
                                        <div className="text-muted text-sm">Active Inventory</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Books Issued</div>
                                        <div className="stat-value">{stats.activeIssues}</div>
                                        <div className="text-muted text-sm">Currently floating</div>
                                   </div>
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Overdue</div>
                                        <div className="stat-value text-error" style={{ color: 'var(--color-error)' }}>{stats.overdueBooks}</div>
                                        <div className="text-muted text-sm">Action needed</div>
                                   </div>
                              </section>

                              <section className="recent-activity glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                   <h3>Pending Requests</h3>
                                   <button className="btn-primary" onClick={() => setActiveTab('requests')} style={{ marginTop: '1rem' }}>View All Requests</button>
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
                              className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
                              onClick={() => setActiveTab('requests')}
                         >
                              Requests
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
