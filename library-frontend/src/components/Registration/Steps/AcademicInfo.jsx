import React from 'react';

const AcademicInfo = ({ data, handleListChange, addListItem, removeListItem }) => {

     const handleAddItem = () => {
          addListItem('academicInfoList', {
               institutionName: "",
               degree: "",
               passingYear: "",
               grade: "",
               gradeInPercentage: ""
          });
     };

     return (
          <div>
               <h3>Academic Information</h3>
               {data.map((item, index) => (
                    <div key={index} className="list-item">
                         <div className="list-item-header">
                              <h4>Record {index + 1}</h4>
                              <button type="button" className="remove-btn" onClick={() => removeListItem('academicInfoList', index)}>Remove</button>
                         </div>
                         <div className="form-grid">
                              <div className="form-group">
                                   <label>Institution Name</label>
                                   <input
                                        type="text"
                                        value={item.institutionName}
                                        onChange={(e) => handleListChange('academicInfoList', index, 'institutionName', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Degree</label>
                                   <input
                                        type="text"
                                        value={item.degree}
                                        onChange={(e) => handleListChange('academicInfoList', index, 'degree', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Passing Year</label>
                                   <input
                                        type="number"
                                        value={item.passingYear}
                                        onChange={(e) => handleListChange('academicInfoList', index, 'passingYear', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Grade</label>
                                   <input
                                        type="text"
                                        value={item.grade}
                                        onChange={(e) => handleListChange('academicInfoList', index, 'grade', e.target.value)}
                                   />
                              </div>
                              <div className="form-group">
                                   <label>Grade (%)</label>
                                   <input
                                        type="number"
                                        value={item.gradeInPercentage}
                                        onChange={(e) => handleListChange('academicInfoList', index, 'gradeInPercentage', e.target.value)}
                                   />
                              </div>
                         </div>
                         <hr />
                    </div>
               ))}
               <button className="add-btn" onClick={handleAddItem}>+ Add Academic Record</button>
          </div>
     );
};

export default AcademicInfo;
