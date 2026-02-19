import React from 'react';

const Address = ({ data, handleChange }) => {
     return (
          <div>
               <h3>Address</h3>
               <div className="form-group">
                    <label>Street</label>
                    <input
                         type="text"
                         value={data.street}
                         onChange={(e) => handleChange('address', 'street', e.target.value)}
                    />
               </div>
               <div className="form-grid">
                    <div className="form-group">
                         <label>City</label>
                         <input
                              type="text"
                              value={data.city}
                              onChange={(e) => handleChange('address', 'city', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>State</label>
                         <input
                              type="text"
                              value={data.state}
                              onChange={(e) => handleChange('address', 'state', e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                         <label>Pincode</label>
                         <input
                              type="text"
                              value={data.pincode}
                              onChange={(e) => handleChange('address', 'pincode', e.target.value)}
                         />
                    </div>
               </div>
          </div>
     );
};

export default Address;
