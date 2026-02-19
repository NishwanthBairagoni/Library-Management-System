import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { getPendingUsers, getApprovedUsers, approveUser, rejectUser } from '../../services/api';

const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const pendingResponse = await getPendingUsers();
                const approvedResponse = await getApprovedUsers();

                const foundUser = [...pendingResponse.data, ...approvedResponse.data].find(u => u.id === parseInt(userId));

                setUser(foundUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleApprove = async () => {
        try {
            await approveUser(user.id);
            alert("User Approved!");
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user.");
        }
    };

    const handleReject = async () => {
        try {
            await rejectUser(user.id);
            alert("User Rejected!");
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error rejecting user:", error);
            alert("Failed to reject user.");
        }
    };

    if (loading) return <div className="dashboard-container" style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    if (!user) return <div className="dashboard-container" style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>User not found.</div>;

    return (
        <div className="dashboard-container" style={{ display: 'block' }}>
            <main className="main-content" style={{ marginLeft: '0', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <header className="topbank-header">
                    <h2>User Details</h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="btn-primary" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>Back to Dashboard</button>
                </header>

                <section className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{user.name || 'N/A'}</h3>
                            <p className="text-muted" style={{ margin: 0 }}>{user.email}</p>
                        </div>
                        <span style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            background: user.status === 'APPROVED' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)',
                            color: user.status === 'APPROVED' ? '#4caf50' : '#ffc107',
                            border: `1px solid ${user.status === 'APPROVED' ? '#4caf50' : '#ffc107'}`
                        }}>
                            {user.status}
                        </span>
                    </div>

                    <div className="grid-cols-2" style={{ gap: '2rem' }}>
                        <div>
                            <h4 style={{ color: 'var(--color-accent-primary)', marginBottom: '1rem' }}>Personal Information</h4>
                            <p><strong>ID:</strong> #U-{user.id}</p>
                            <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
                            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                            <p><strong>Marital Status:</strong> {user.maritalStatus || 'N/A'}</p>
                            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--color-accent-primary)', marginBottom: '1rem' }}>Role Information</h4>
                            <p><strong>Role:</strong> {user.role}</p>
                            {user.role === 'STUDENT' && <p><strong>Department:</strong> {user.department || 'N/A'}</p>}
                            {user.role === 'LIBRARIAN' && <p><strong>Employee ID:</strong> {user.employeeId || 'N/A'}</p>}
                            <p><strong>Membership:</strong> {user.membershipType || 'Standard'}</p>
                        </div>
                    </div>

                    {user.academicDetails && user.academicDetails.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ color: 'var(--color-accent-primary)', marginBottom: '1rem' }}>Academic Details</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Level</th>
                                            <th>Institution</th>
                                            <th>Passing Year</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.academicDetails.map((edu, idx) => (
                                            <tr key={idx}>
                                                <td>{edu.level}</td>
                                                <td>{edu.institution}</td>
                                                <td>{edu.passingYear}</td>
                                                <td>{edu.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {user.workExperience && user.workExperience.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ color: 'var(--color-accent-primary)', marginBottom: '1rem' }}>Work Experience</h4>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Role</th>
                                            <th>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.workExperience.map((work, idx) => (
                                            <tr key={idx}>
                                                <td>{work.company}</td>
                                                <td>{work.role}</td>
                                                <td>{work.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {user.status === 'PENDING' && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                            <button onClick={handleApprove} className="btn-primary" style={{ flex: 1, background: 'var(--color-success)' }}>Approve User</button>
                            <button onClick={handleReject} className="btn-primary" style={{ flex: 1, background: 'var(--color-error)' }}>Reject User</button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserDetails;
