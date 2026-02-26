import React from 'react';
import MultiStepForm from '../../components/Registration/MultiStepForm';

const AdminRegister = () => {
    return (
        <div className="auth-layout">
            <MultiStepForm role="ADMIN" />
        </div>
    );
};

export default AdminRegister;
