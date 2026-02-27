import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import { getAllBooks, getUserHistory } from '../../services/api';

const StudentDashboard = () => {
     const [activeTab, setActiveTab] = useState('dashboard');
     const [books, setBooks] = useState([]);
     const [history, setHistory] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [selectedGenre, setSelectedGenre] = useState('');
     const [searchPage, setSearchPage] = useState(1);
     const [historyPage, setHistoryPage] = useState(1);
     const [borrowsPage, setBorrowsPage] = useState(1);
     const itemsPerPage = 10;
     const user = JSON.parse(localStorage.getItem('user')) || {};

     useEffect(() => {
          setSearchPage(1);
          setHistoryPage(1);
          setBorrowsPage(1);
          if (activeTab === 'search') {
               fetchBooks();
          } else if (activeTab === 'history' || activeTab === 'dashboard') {
               if (user.id) fetchHistory(user.id);
          }
     }, [activeTab, user.id]);

     const fetchBooks = async () => {
          try {
               const response = await getAllBooks();
               setBooks(response.data);
          } catch (error) {
               console.error("Error fetching books:", error);
          }
     };

     const fetchHistory = async (userId) => {
          try {
               const response = await getUserHistory(userId);
               setHistory(response.data);
          } catch (error) {
               console.error("Error fetching history:", error);
          }
     };

     const filteredBooks = books.filter(book => {
          const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
               book.isbn.includes(searchTerm);
          const matchesGenre = selectedGenre ? (book.genre && book.genre.toLowerCase() === selectedGenre.toLowerCase()) : true;
          return matchesSearch && matchesGenre;
     });

     const genres = [...new Set(books.map(book => book.genre).filter(g => g))];

     const renderContent = () => {
          const activeBorrows = history.filter(h => h.status === 'ISSUED');

          // Pagination calculations
          const indexOfLastSearch = searchPage * itemsPerPage;
          const indexOfFirstSearch = indexOfLastSearch - itemsPerPage;
          const currentSearchBooks = filteredBooks.slice(indexOfFirstSearch, indexOfLastSearch);
          const totalSearchPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;

          const indexOfLastHistory = historyPage * itemsPerPage;
          const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
          const currentHistory = history.slice(indexOfFirstHistory, indexOfLastHistory);
          const totalHistoryPages = Math.ceil(history.length / itemsPerPage) || 1;

          const indexOfLastBorrow = borrowsPage * itemsPerPage;
          const indexOfFirstBorrow = indexOfLastBorrow - itemsPerPage;
          const currentBorrows = activeBorrows.slice(indexOfFirstBorrow, indexOfLastBorrow);
          const totalBorrowsPages = Math.ceil(activeBorrows.length / itemsPerPage) || 1;

          switch (activeTab) {
               case 'search':
                    return (
                         <section className="search-section glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <h3>Search Books</h3>
                              <input
                                   type="text"
                                   placeholder="Search for books, authors, or ISBN..."
                                   value={searchTerm}
                                   onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSearchPage(1);
                                   }}
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
                              <select
                                   value={selectedGenre}
                                   onChange={(e) => {
                                        setSelectedGenre(e.target.value);
                                        setSearchPage(1);
                                   }}
                                   style={{
                                        width: '100%',
                                        padding: '1rem',
                                        marginTop: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: 'var(--color-text-primary)' // Note: Standard select styling might be limited
                                   }}
                              >
                                   <option value="" style={{ color: 'black' }}>All Genres</option>
                                   {genres.map((g, index) => (
                                        <option key={index} value={g} style={{ color: 'black' }}>{g}</option>
                                   ))}
                              </select>
                              <div className="table-container" style={{ marginTop: '2rem' }}>
                                   <table>
                                        <thead>
                                             <tr>
                                                  <th>Title</th>
                                                  <th>Author</th>
                                                  <th>Genre</th>
                                                  <th>Publisher</th>
                                                  <th>ISBN</th>
                                                  <th>Stock</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {currentSearchBooks.map(book => (
                                                  <tr key={book.id}>
                                                       <td>{book.title}</td>
                                                       <td>{book.author}</td>
                                                       <td>{book.genre || '-'}</td>
                                                       <td>{book.publisher || '-'}</td>
                                                       <td>{book.isbn}</td>
                                                       <td>{book.quantity > 0 ? 'Available' : 'Out of Stock'}</td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                              {true && (
                                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                                        <button
                                             onClick={() => setSearchPage(prev => Math.max(prev - 1, 1))}
                                             disabled={searchPage === 1}
                                             style={{ padding: '0.4rem 0.8rem', opacity: searchPage === 1 ? 0.5 : 1, cursor: searchPage === 1 ? 'not-allowed' : 'pointer' }}
                                             className="btn-primary"
                                        >
                                             Previous
                                        </button>
                                        <span>Page {searchPage} of {totalSearchPages}</span>
                                        <button
                                             onClick={() => setSearchPage(prev => Math.min(prev + 1, totalSearchPages))}
                                             disabled={searchPage === totalSearchPages}
                                             style={{ padding: '0.4rem 0.8rem', opacity: searchPage === totalSearchPages ? 0.5 : 1, cursor: searchPage === totalSearchPages ? 'not-allowed' : 'pointer' }}
                                             className="btn-primary"
                                        >
                                             Next
                                        </button>
                                   </div>
                              )}
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
                                                  <th>Book ID</th>
                                                  <th>Issued Date</th>
                                                  <th>Returned Date</th>
                                                  <th>Status</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {currentHistory.map(issue => (
                                                  <tr key={issue.id}>
                                                       <td>{issue.book ? issue.book.title : issue.bookId}</td>
                                                       <td>{issue.issueDate}</td>
                                                       <td>{issue.actualReturnDate || '-'}</td>
                                                       <td>
                                                            <span style={{ color: issue.status === 'ISSUED' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                                                                 {issue.status}
                                                            </span>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                              {true && (
                                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                                        <button
                                             onClick={() => setHistoryPage(prev => Math.max(prev - 1, 1))}
                                             disabled={historyPage === 1}
                                             style={{ padding: '0.4rem 0.8rem', opacity: historyPage === 1 ? 0.5 : 1, cursor: historyPage === 1 ? 'not-allowed' : 'pointer' }}
                                             className="btn-primary"
                                        >
                                             Previous
                                        </button>
                                        <span>Page {historyPage} of {totalHistoryPages}</span>
                                        <button
                                             onClick={() => setHistoryPage(prev => Math.min(prev + 1, totalHistoryPages))}
                                             disabled={historyPage === totalHistoryPages}
                                             style={{ padding: '0.4rem 0.8rem', opacity: historyPage === totalHistoryPages ? 0.5 : 1, cursor: historyPage === totalHistoryPages ? 'not-allowed' : 'pointer' }}
                                             className="btn-primary"
                                        >
                                             Next
                                        </button>
                                   </div>
                              )}
                         </section>
                    );
               case 'profile':
                    return (
                         <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                              <h3>My Profile</h3>
                              <div className="grid-cols-2">
                                   <div>
                                        <p className="text-muted">User ID</p>
                                        <p className="text-lg">#U-{user.id}</p>
                                   </div>
                                   <div>
                                        <p className="text-muted">Email</p>
                                        <p className="text-lg">{user.email}</p>
                                   </div>
                                   <div>
                                        <p className="text-muted">Role</p>
                                        <p className="text-lg">{user.role}</p>
                                   </div>
                              </div>
                         </section>
                    );
               default:
                    const activeBorrows = history.filter(h => h.status === 'ISSUED');
                    return (
                         <>
                              <section className="stats-grid">
                                   <div className="stat-card glass-panel">
                                        <div className="stat-label">Books Borrowed</div>
                                        <div className="stat-value">{activeBorrows.length}</div>
                                        <div className="text-muted text-sm">Active Issues</div>
                                   </div>
                              </section>

                              <section className="recent-activity glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                   <h3>Currently Borrowed</h3>
                                   <div className="table-container">
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>Book</th>
                                                       <th>Due Date</th>
                                                       <th>Status</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {activeBorrows.length === 0 ? <tr><td colSpan="3">No active borrows.</td></tr> :
                                                       currentBorrows.map(issue => (
                                                            <tr key={issue.id}>
                                                                 <td>{issue.book ? issue.book.title : `Book #${issue.book.id}`}</td>
                                                                 <td>{issue.returnDate}</td>
                                                                 <td><span style={{ color: 'var(--color-warning)' }}>Issued</span></td>
                                                            </tr>
                                                       ))
                                                  }
                                             </tbody>
                                        </table>
                                   </div>
                                   {true && (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                                             <button
                                                  onClick={() => setBorrowsPage(prev => Math.max(prev - 1, 1))}
                                                  disabled={borrowsPage === 1}
                                                  style={{ padding: '0.4rem 0.8rem', opacity: borrowsPage === 1 ? 0.5 : 1, cursor: borrowsPage === 1 ? 'not-allowed' : 'pointer' }}
                                                  className="btn-primary"
                                             >
                                                  Previous
                                             </button>
                                             <span>Page {borrowsPage} of {totalBorrowsPages}</span>
                                             <button
                                                  onClick={() => setBorrowsPage(prev => Math.min(prev + 1, totalBorrowsPages))}
                                                  disabled={borrowsPage === totalBorrowsPages}
                                                  style={{ padding: '0.4rem 0.8rem', opacity: borrowsPage === totalBorrowsPages ? 0.5 : 1, cursor: borrowsPage === totalBorrowsPages ? 'not-allowed' : 'pointer' }}
                                                  className="btn-primary"
                                             >
                                                  Next
                                             </button>
                                        </div>
                                   )}
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
