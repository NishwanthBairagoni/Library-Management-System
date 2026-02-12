import React from 'react';

const PersonalDetails = ({ data, handleChange }) => {
     return (
          <div>
               <h3>Personal Details</h3>
               <div className="form-grid">
                    <div className="form-group">
                         <label>First Name</label>
                         <input
                              type="text"
                              value={data.firstName}
                              onChange={(e) => handleChange('personalDetails', 'firstName', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input
                              type="text"
                              value={data.lastName}
                              onChange={(e) => handleChange('personalDetails', 'lastName', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Email</label>
                         <input
                              type="email"
                              value={data.email}
                              onChange={(e) => handleChange('personalDetails', 'email', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Phone</label>
                         <input
                              type="text"
                              value={data.phone}
                              onChange={(e) => handleChange('personalDetails', 'phone', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Contact No</label>
                         <input
                              type="text"
                              value={data.contactNo}
                              onChange={(e) => handleChange('personalDetails', 'contactNo', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Gender</label>
                         <select
                              value={data.gender}
                              onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                         >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                         </select>
                    </div>
                    <div className="form-group">
                         <label>Marital Status</label>
                         <select
                              value={data.maritalStatus}
                              onChange={(e) => handleChange('personalDetails', 'maritalStatus', e.target.value)}
                         >
                              <option value="">Select Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Single Forever">Single Forever</option>
                         </select>
                    </div>
               </div>
          </div>
     );
};

export default PersonalDetails;
