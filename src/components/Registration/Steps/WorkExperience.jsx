import React from 'react';

const WorkExperience = ({ data, handleListChange, addListItem, removeListItem }) => {

     const handleAddItem = () => {
          addListItem('workExperienceList', {
               startDate: "",
               endDate: "",
               currentlyWorking: false,
               companyName: "",
               designation: "",
               ctc: "",
               reasonForLeaving: ""
          });
     };

     return (
          <div>
               <h3>Work Experience</h3>
               {data.map((item, index) => (
                    <div key={index} className="list-item">
                         <div className="list-item-header">
                              <h4>Experience {index + 1}</h4>
                              <button type="button" className="remove-btn" onClick={() => removeListItem('workExperienceList', index)}>Remove</button>
                         </div>
                         <div className="form-grid">
                              <div className="form-group">
                                   <label>Company Name</label>
                                   <input
                                        type="text"
                                        value={item.companyName}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'companyName', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Designation</label>
                                   <input
                                        type="text"
                                        value={item.designation}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'designation', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Start Date</label>
                                   <input
                                        type="date"
                                        value={item.startDate}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'startDate', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>End Date</label>
                                   <input
                                        type="date"
                                        value={item.endDate || ''}
                                        disabled={item.currentlyWorking}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'endDate', e.target.value)}
                                   />
                              </div>

                              <div className="form-group checkbox-group">
                                   <label>
                                        <input
                                             type="checkbox"
                                             checked={item.currentlyWorking}
                                             onChange={(e) => handleListChange('workExperienceList', index, 'currentlyWorking', e.target.checked)}
                                        />
                                        Currently Working
                                   </label>
                              </div>

                              <div className="form-group">
                                   <label>CTC</label>
                                   <input
                                        type="number"
                                        value={item.ctc}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'ctc', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Reason for Leaving</label>
                                   <input
                                        type="text"
                                        value={item.reasonForLeaving || ''}
                                        disabled={item.currentlyWorking}
                                        onChange={(e) => handleListChange('workExperienceList', index, 'reasonForLeaving', e.target.value)}
                                   />
                              </div>
                         </div>
                         <hr />
                    </div>
               ))}
               <button className="add-btn" onClick={handleAddItem}>+ Add Work Experience</button>
          </div>
     );
};

export default WorkExperience;
