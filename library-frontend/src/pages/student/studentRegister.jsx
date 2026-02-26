import React from 'react';
import MultiStepForm from '../../components/Registration/MultiStepForm';

const StudentRegister = () => {
     return (
          <div className="auth-layout">
               <MultiStepForm role="STUDENT" />
          </div>
     );
};

export default StudentRegister;
