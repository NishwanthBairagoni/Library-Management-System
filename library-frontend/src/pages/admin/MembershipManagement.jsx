import React, { useState, useEffect } from 'react';
import { getAllPlans, createPlan, updatePlan, deletePlan, togglePlanStatus } from '../../services/membershipService';
import '../../styles/Dashboard.css';

const MembershipManagement = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPlanId, setCurrentPlanId] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        maxBooksAllowed: '',
        loanPeriodDays: '',
        lateFeePerDay: '',
        benefits: ''
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await getAllPlans();
            setPlans(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching membership plans:", err);
            setError("Failed to load membership plans.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert comma separated string to array for benefits
            const submitData = {
                ...formData,
                price: parseFloat(formData.price),
                maxBooksAllowed: parseInt(formData.maxBooksAllowed),
                loanPeriodDays: parseInt(formData.loanPeriodDays),
                lateFeePerDay: parseFloat(formData.lateFeePerDay),
                benefits: typeof formData.benefits === 'string'
                    ? formData.benefits.split(',').map(b => b.trim()).filter(b => b)
                    : formData.benefits,
                active: true
            };

            if (isEditing) {
                // To keep active status unchanged, we might need to find the plan first or pass active state
                const existingPlan = plans.find(p => p.id === currentPlanId);
                if (existingPlan) submitData.active = existingPlan.active;
                await updatePlan(currentPlanId, submitData);
                alert("Plan updated successfully");
            } else {
                await createPlan(submitData);
                alert("Plan added successfully");
            }
            fetchPlans();
            closeModal();
        } catch (err) {
            console.error("Error saving plan:", err);
            alert("Failed to save plan.");
        }
    };

    const handleEdit = (plan) => {
        setFormData({
            name: plan.name,
            price: plan.price,
            maxBooksAllowed: plan.maxBooksAllowed,
            loanPeriodDays: plan.loanPeriodDays,
            lateFeePerDay: plan.lateFeePerDay,
            benefits: Array.isArray(plan.benefits) ? plan.benefits.join(', ') : ''
        });
        setCurrentPlanId(plan.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            try {
                await deletePlan(id);
                fetchPlans();
            } catch (err) {
                console.error("Error deleting plan:", err);
                alert("Failed to delete plan.");
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await togglePlanStatus(id);
            fetchPlans();
        } catch (err) {
            console.error("Error toggling status:", err);
            alert("Failed to change plan status.");
        }
    };

    const openModal = () => {
        setFormData({ name: '', price: '', maxBooksAllowed: '', loanPeriodDays: '', lateFeePerDay: '', benefits: '' });
        setIsEditing(false);
        setCurrentPlanId(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setError(null);
    };

    if (loading && plans.length === 0) return <div>Loading membership plans...</div>;

    return (
        <section className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <h3>Membership Plans</h3>
                <button className="btn-primary" onClick={openModal}>Add New Plan</button>
            </div>

            {error && <div className="text-error" style={{ marginBottom: '1rem', color: 'var(--color-error)' }}>{error}</div>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {plans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(plan => (
                    <div key={plan.id} className="glass-panel" style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        borderTop: `4px solid ${plan.active ? 'var(--color-success)' : 'var(--color-text-muted)'}`,
                        opacity: plan.active ? 1 : 0.7
                    }}>
                        {!plan.active && (
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'var(--color-error)', color: 'white',
                                padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                            }}>Inactive</div>
                        )}
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{plan.name}</h4>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent-primary)', marginBottom: '1.5rem' }}>
                            ₹{plan.price} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>/ month</span>
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Max Books</span>
                                <span style={{ fontWeight: 'bold' }}>{plan.maxBooksAllowed}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Loan Period</span>
                                <span style={{ fontWeight: 'bold' }}>{plan.loanPeriodDays} days</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Late Fee</span>
                                <span style={{ fontWeight: 'bold' }}>₹{plan.lateFeePerDay} / day</span>
                            </div>
                        </div>

                        <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                            <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Benefits:</strong>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {plan.benefits && plan.benefits.map((benefit, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--color-text-primary)' }}>
                                        <span style={{ color: 'var(--color-success)', marginRight: '8px' }}>✓</span>
                                        <span style={{ fontSize: '0.9rem' }}>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
                            <button
                                onClick={() => handleEdit(plan)}
                                style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleToggleStatus(plan.id)}
                                style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: plan.active ? 'var(--color-warning)' : 'var(--color-success)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                            >
                                {plan.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                                onClick={() => handleDelete(plan.id)}
                                style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--color-error)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.4)'}
                                onMouseOut={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {true && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                    >
                        Previous
                    </button>
                    <span style={{ color: 'white' }}>Page {currentPage} of {Math.ceil(plans.length / itemsPerPage)}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(plans.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(plans.length / itemsPerPage)}
                        style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: currentPage === Math.ceil(plans.length / itemsPerPage) ? 'not-allowed' : 'pointer', opacity: currentPage === Math.ceil(plans.length / itemsPerPage) ? 0.5 : 1 }}
                    >
                        Next
                    </button>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="modal-content glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h4>{isEditing ? 'Edit Membership Plan' : 'Add New Membership Plan'}</h4>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Plan Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="input-field"
                                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Price (₹ / month)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="input-field"
                                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Max Books Allowed</label>
                                        <input
                                            type="number"
                                            name="maxBooksAllowed"
                                            value={formData.maxBooksAllowed}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            className="input-field"
                                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Loan Period (Days)</label>
                                        <input
                                            type="number"
                                            name="loanPeriodDays"
                                            value={formData.loanPeriodDays}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            className="input-field"
                                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Late Fee Per Day (₹)</label>
                                    <input
                                        type="number"
                                        name="lateFeePerDay"
                                        value={formData.lateFeePerDay}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Benefits (Comma separated)</label>
                                    <textarea
                                        name="benefits"
                                        value={formData.benefits}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        placeholder="e.g. Access to standard collection, Free home delivery"
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px', resize: 'vertical' }}
                                    ></textarea>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                                    {isEditing ? 'Update Plan' : 'Save Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MembershipManagement;
