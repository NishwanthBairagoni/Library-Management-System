import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { getPendingUsers, approveUser, rejectUser, getApprovedUsers, deleteUser, getAllBooks, deleteBook, addBook, updateBook, getDashboardStats } from '../../services/api';
import MembershipManagement from './MembershipManagement';

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
     const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', quantity: 1, category: '', publisher: '', publicationYear: '', language: '', price: '' });
     const [searchQuery, setSearchQuery] = useState('');
     const [filterAttribute, setFilterAttribute] = useState('category');

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
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, category: '', publisher: '', publicationYear: '', language: '', price: '' });
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
               quantity: book.quantity,
               category: book.category || '',
               publisher: book.publisher || '',
               publicationYear: book.publicationYear || '',
               language: book.language || '',
               price: book.price || ''
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
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, category: '', publisher: '', publicationYear: '', language: '', price: '' });
          } else {
               setShowAddBook(true);
               setIsEditing(false);
               setCurrentBookId(null);
               setNewBook({ title: '', author: '', isbn: '', quantity: 1, category: '', publisher: '', publicationYear: '', language: '', price: '' });
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
          const filteredBooks = books.filter(book => {
               if (!searchQuery) return true;
               const value = book[filterAttribute];
               if (value == null) return false;
               return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
          });

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
                                   <div className="modal-overlay">
                                        <div className="modal-content glass-panel">
                                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                  <h4>{isEditing ? 'Edit Book' : 'Add New Book'}</h4>
                                                  <button onClick={toggleAddBook} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                                             </div>
                                             <form onSubmit={handleAddBook}>
                                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                       <input
                                                            type="text"
                                                            placeholder="Title"
                                                            value={newBook.title}
                                                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                                            required
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="text"
                                                            placeholder="Author"
                                                            value={newBook.author}
                                                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                                            required
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="text"
                                                            placeholder="ISBN"
                                                            value={newBook.isbn}
                                                            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                                                            required
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="text"
                                                            placeholder="Category"
                                                            value={newBook.category}
                                                            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="text"
                                                            placeholder="Publisher"
                                                            value={newBook.publisher}
                                                            onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="number"
                                                            placeholder="Publication Year"
                                                            value={newBook.publicationYear}
                                                            onChange={(e) => setNewBook({ ...newBook, publicationYear: parseInt(e.target.value) || '' })}
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="text"
                                                            placeholder="Language"
                                                            value={newBook.language}
                                                            onChange={(e) => setNewBook({ ...newBook, language: e.target.value })}
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="number"
                                                            placeholder="Price"
                                                            value={newBook.price}
                                                            onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) || '' })}
                                                            step="0.01"
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                       <input
                                                            type="number"
                                                            placeholder="Quantity"
                                                            value={newBook.quantity}
                                                            onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) || 0 })}
                                                            min="1"
                                                            required
                                                            className="input-field"
                                                            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                                       />
                                                  </div>
                                                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                                                       <button type="button" onClick={toggleAddBook} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                            Cancel
                                                       </button>
                                                       <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                                                            {isEditing ? 'Update Book' : 'Save Book'}
                                                       </button>
                                                  </div>
                                             </form>
                                        </div>
                                   </div>
                              )}
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
                                   {loading ? <p>Loading...</p> : (
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>ISBN</th>
                                                       <th>Title</th>
                                                       <th>Author</th>
                                                       <th>Category</th>
                                                       <th>Publisher</th>
                                                       <th>Year</th>
                                                       <th>Lang</th>
                                                       <th>Price</th>
                                                       <th>Stock</th>
                                                       <th>Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {filteredBooks.length === 0 ? (
                                                       <tr><td colSpan="11" style={{ textAlign: 'center' }}>No books found matching criteria.</td></tr>
                                                  ) : (
                                                       filteredBooks.map(book => (
                                                            <tr key={book.id}>
                                                                 <td>#B-{book.id}</td>
                                                                 <td>{book.isbn}</td>
                                                                 <td>{book.title}</td>
                                                                 <td>{book.author}</td>
                                                                 <td>{book.category || '-'}</td>
                                                                 <td>{book.publisher || '-'}</td>
                                                                 <td>{book.publicationYear || '-'}</td>
                                                                 <td>{book.language || '-'}</td>
                                                                 <td>{book.price ? `$${book.price}` : '-'}</td>
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
               case 'memberships':
                    return <MembershipManagement />;
               default:
                    const totalStats = stats.totalBooks + stats.activeIssues + stats.overdueBooks;
                    const getPercentage = (val) => totalStats > 0 ? `${(val / totalStats * 100).toFixed(0)}%` : '0%';

                    const totalPlatform = stats.totalUsers + stats.totalBooks;
                    const usersPercentage = totalPlatform > 0 ? `${(stats.totalUsers / totalPlatform * 100).toFixed(0)}%` : '0%';
                    const booksPercentage = totalPlatform > 0 ? `${(stats.totalBooks / totalPlatform * 100).toFixed(0)}%` : '0%';

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

                              <section className="charts-section glass-panel" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                                   <h3 style={{ marginBottom: '1.5rem' }}>Dashboard Analytics</h3>
                                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                        {/* Custom CSS Bar Chart */}
                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                                             <h4 style={{ marginBottom: '2rem', textAlign: 'center' }}>Book Inventory Status</h4>
                                             <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '200px', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

                                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', height: '100%' }}>
                                                       <span style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{stats.totalBooks}</span>
                                                       <div style={{
                                                            width: '100%',
                                                            height: getPercentage(stats.totalBooks),
                                                            background: 'linear-gradient(to top, #ef4444, #f87171)',
                                                            borderRadius: '4px 4px 0 0',
                                                            transition: 'height 1s ease'
                                                       }}></div>
                                                       <span style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Total</span>
                                                  </div>

                                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', height: '100%' }}>
                                                       <span style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{stats.activeIssues}</span>
                                                       <div style={{
                                                            width: '100%',
                                                            height: getPercentage(stats.activeIssues),
                                                            background: 'linear-gradient(to top, #10b981, #34d399)',
                                                            borderRadius: '4px 4px 0 0',
                                                            transition: 'height 1s ease'
                                                       }}></div>
                                                       <span style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Issued</span>
                                                  </div>

                                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', height: '100%' }}>
                                                       <span style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{stats.overdueBooks}</span>
                                                       <div style={{
                                                            width: '100%',
                                                            height: getPercentage(stats.overdueBooks),
                                                            background: 'linear-gradient(to top, #f97316, #fdba74)',
                                                            borderRadius: '4px 4px 0 0',
                                                            transition: 'height 1s ease'
                                                       }}></div>
                                                       <span style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Overdue</span>
                                                  </div>

                                             </div>
                                        </div>

                                        {/* SVG Circle Bar Chart */}
                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                             <h4 style={{ marginBottom: '2rem', textAlign: 'center' }}>System Composition</h4>

                                             <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '2rem' }}>
                                                  <svg width="180" height="180" viewBox="0 0 180 180" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}>
                                                       {/* Background circles */}
                                                       <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                                                       <circle cx="90" cy="90" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />

                                                       {/* Books (Outer Ring) */}
                                                       <circle cx="90" cy="90" r="70" fill="none" stroke="#ef4444" strokeWidth="16"
                                                            strokeDasharray={2 * Math.PI * 70}
                                                            strokeDashoffset={2 * Math.PI * 70 * (1 - (parseFloat(booksPercentage) || 0) / 100)}
                                                            strokeLinecap="round" transform="rotate(-90 90 90)"
                                                            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />

                                                       {/* Users (Inner Ring) */}
                                                       <circle cx="90" cy="90" r="46" fill="none" stroke="#6366f1" strokeWidth="16"
                                                            strokeDasharray={2 * Math.PI * 46}
                                                            strokeDashoffset={2 * Math.PI * 46 * (1 - (parseFloat(usersPercentage) || 0) / 100)}
                                                            strokeLinecap="round" transform="rotate(-90 90 90)"
                                                            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
                                                  </svg>
                                             </div>

                                             <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                       <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#6366f1' }}></div>
                                                       <span>Users ({stats.totalUsers}) - {usersPercentage}</span>
                                                  </div>
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                       <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#ef4444' }}></div>
                                                       <span>Books ({stats.totalBooks}) - {booksPercentage}</span>
                                                  </div>
                                             </div>
                                        </div>
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
                         <button
                              className={`nav-item ${activeTab === 'memberships' ? 'active' : ''}`}
                              onClick={() => setActiveTab('memberships')}
                         >
                              Memberships
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
