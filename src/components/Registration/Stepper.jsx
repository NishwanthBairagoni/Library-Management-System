import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div key={index} className={`step-item ${index <= currentStep ? 'active' : ''}`}>
          <div className="step-circle">{index + 1}</div>
          <div className="step-label">{step}</div>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
