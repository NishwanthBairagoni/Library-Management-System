import React from 'react';

const UploadDocuments = ({ data, handleChange }) => {
     return (
          <div className="form-step-container">
               <h3>Upload Government Authorized ID</h3>
               <p className="step-description">Please upload a valid government ID (Aadhar, PAN, Passport, etc.) for verification.</p>

               <div className="form-group">
                    <label className="form-label">Document Type</label>
                    <select
                         className="form-input"
                         value={data.docType || ''}
                         onChange={(e) => handleChange('documents', 'docType', e.target.value)}
                    >
                         <option value="">Select Document Type</option>
                         <option value="aadhar">Aadhar Card</option>
                         <option value="pan">PAN Card</option>
                         <option value="passport">Passport</option>
                         <option value="driving_license">Driving License</option>
                         <option value="voter_id">Voter ID</option>
                    </select>
               </div>

               <div className="form-group">
                    <label className="form-label">Upload File</label>
                    <input
                         type="file"
                         className="form-input"
                         accept=".jpg,.jpeg,.png,.pdf"
                         onChange={(e) => {
                              const file = e.target.files[0];
                              handleChange('documents', 'file', file);
                              handleChange('documents', 'fileName', file ? file.name : '');
                         }}
                    />
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                         Accepted formats: JPG, PNG, PDF. Max size: 5MB.
                    </p>
                    {data.fileName && (
                         <div className="file-preview" style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                              Selected: <strong>{data.fileName}</strong>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default UploadDocuments;
