import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from './Stepper';
import PersonalDetails from './Steps/PersonalDetails';
import Address from './Steps/Address';
import AcademicInfo from './Steps/AcademicInfo';
import WorkExperience from './Steps/WorkExperience';
import UploadDocuments from './Steps/UploadDocuments';
import './MultiStepForm.css';

const MultiStepForm = () => {
     const navigate = useNavigate();
     const [currentStep, setCurrentStep] = useState(0);
     const steps = ["Personal Details", "Address", "Academic Info", "Work Experience", "Upload ID"];

     const [formData, setFormData] = useState({
          personalDetails: {
               firstName: "",
               lastName: "",
               email: "",
               password: "", // Added password field
               phone: "",
               gender: "",
               maritalStatus: "",
               department: "",
               employeeId: "",
               role: ""
          },
          address: {
               street: "",
               city: "",
               state: "",
               pincode: ""
          },
          academicInfoList: [],
          workExperienceList: [],
          documents: {
               docType: "",
               file: null,
               fileName: ""
          }
     });

     const handleNext = () => {
          if (currentStep < steps.length - 1) {
               setCurrentStep(currentStep + 1);
          } else {
               handleSubmit();
          }
     };

     const handleBack = () => {
          if (currentStep > 0) {
               setCurrentStep(currentStep - 1);
          }
     };

     const handleChange = (section, field, value) => {
          setFormData(prev => ({
               ...prev,
               [section]: {
                    ...prev[section],
                    [field]: value
               }
          }));
     };

     const handleListChange = (listName, index, field, value) => {
          const updatedList = [...formData[listName]];
          updatedList[index][field] = value;
          setFormData(prev => ({
               ...prev,
               [listName]: updatedList
          }));
     }

     const addListItem = (listName, itemTemplate) => {
          setFormData(prev => ({
               ...prev,
               [listName]: [...prev[listName], itemTemplate]
          }));
     }

     const removeListItem = (listName, index) => {
          const updatedList = formData[listName].filter((_, i) => i !== index);
          setFormData(prev => ({
               ...prev,
               [listName]: updatedList
          }));
     }


     const handleSubmit = async () => {
          console.log("Final Form Data:", JSON.stringify(formData, null, 2));

          // Map complex form data to simple backend definition
          const registerData = {
               name: `${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`,
               email: formData.personalDetails.email,
               password: formData.personalDetails.password,
               role: formData.personalDetails.role || "USER",
               phoneNumber: formData.personalDetails.phone,
               address: `${formData.address.street}, ${formData.address.city}, ${formData.address.state} - ${formData.address.pincode}`,
               department: formData.personalDetails.department,
               employeeId: formData.personalDetails.employeeId,
               gender: formData.personalDetails.gender,
               maritalStatus: formData.personalDetails.maritalStatus,
               academicInfoList: formData.academicInfoList,
               workExperienceList: formData.workExperienceList
          };

          try {
               await import('../../services/api').then(module => module.register(registerData));
               alert("Registration Successful! Please wait for Admin approval.");
               navigate("/student/login"); // Redirect to login
          } catch (error) {
               console.error("Registration failed:", error);
               alert("Registration failed: " + (error.response?.data || error.message));
          }
     };

     const renderStep = () => {
          switch (currentStep) {
               case 0:
                    return <PersonalDetails data={formData.personalDetails} handleChange={handleChange} />;
               case 1:
                    return <Address data={formData.address} handleChange={handleChange} />;
               case 2:
                    return <AcademicInfo data={formData.academicInfoList} handleListChange={handleListChange} addListItem={addListItem} removeListItem={removeListItem} />;
               case 3:
                    return <WorkExperience data={formData.workExperienceList} handleListChange={handleListChange} addListItem={addListItem} removeListItem={removeListItem} />;
               case 4:
                    return <UploadDocuments data={formData.documents} handleChange={handleChange} />;
               default:
                    return null;
          }
     };

     return (
          <div className="multi-step-form-container">
               <button
                    onClick={() => navigate('/')}
                    style={{
                         background: 'none',
                         border: 'none',
                         color: 'var(--color-text-secondary)',
                         cursor: 'pointer',
                         marginBottom: '1rem',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.5rem'
                    }}
               >
                    ← Back to Home
               </button>
               <h2 className="form-title">{formData.personalDetails.role ? `${formData.personalDetails.role} Registration` : 'Registration'}</h2>
               <Stepper currentStep={currentStep} steps={steps} />

               <div className="step-content">
                    {renderStep()}
               </div>

               <div className="form-navigation">
                    <button
                         className="nav-btn back-btn"
                         onClick={handleBack}
                         disabled={currentStep === 0}
                    >
                         Back
                    </button>
                    <button
                         className="nav-btn next-btn"
                         onClick={handleNext}
                    >
                         {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </button>
               </div>
          </div>
     );
};

export default MultiStepForm;
