import React from 'react';
import LoginForm from '../../components/Login/LoginForm';

const AdminLogin = () => {
    return (
        <div className="auth-layout">
            <LoginForm role="ADMIN" />
        </div>
    );
};

export default AdminLogin;
