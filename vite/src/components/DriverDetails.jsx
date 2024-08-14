import React, { useState } from 'react';
import axios from 'axios';
import './Driver.css';
import Navbar from './Navbar';

const DriverDetails = () => {
  const [iqamaNo, setIqamaNo] = useState('');
  const [driverData, setDriverData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/drivers/${iqamaNo}`);
      setDriverData(response.data);
    } catch (error) {
      console.error('Error fetching driver details:', error);
      alert('Driver not found.');
    }
  };

  const handleNew = () => {
    setIqamaNo('');
    setDriverData({
      السائق_اسم: '',
      السائق_جنسية: '',
      السائق_جوال: '',
      السائق_هوية_رقم: '',
      اللوحة_رقم: '',
      المركبة_رقم: '',
      شركة_النقل_اسم: ''
    });
    setEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (driverData._id) {
        await axios.put(`http://localhost:5000/api/drivers/${iqamaNo}`, driverData);
      } else {
        await axios.post('http://localhost:5000/api/drivers', driverData);
      }
      setShowAlert(true);
      setEditing(false);
      setDriverData(null); 
      setIqamaNo(''); 
      setTimeout(() => setShowAlert(false), 7000);
    } catch (error) {
      console.error('Error updating driver details:', error);
      alert('Failed to update driver details.');
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ fontSize: '25px' }}><b>Search Driver</b></h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Iqama #"
          value={iqamaNo}
          onChange={(e) => setIqamaNo(e.target.value)}
        />
        <button onClick={handleSearch} style={{ margin: '10px' }}>Go</button>
        <button onClick={handleNew}>New</button>
      </div>

      {showAlert && (
        <div id="alert-border-1" className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert" style={{width:'50%',marginLeft:'27%',marginTop:'50px'}}>
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div className="ms-3 text-sm font-medium">
          Details updated successfully
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-1" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}

      {driverData && (
        <div className="driver-details">
          <h3>Driver Details</h3>
          {editing ? (
            <form>
              {/* Form fields for editing */}
              <div className="form-row">
                <div className="form-section">
                  <label>Driver Name</label>
                  <input
                    type="text"
                    name="السائق_اسم"
                    value={driverData.السائق_اسم}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-section">
                  <label>Nationality</label>
                  <input
                    type="text"
                    name="السائق_جنسية"
                    value={driverData.السائق_جنسية}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-section">
                  <label>Mobile #</label>
                  <input
                    type="text"
                    name="السائق_جوال"
                    value={driverData.السائق_جوال}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-section">
                  <label>Iqama No #</label>
                  <input
                    type="text"
                    name="السائق_هوية_رقم"
                    value={driverData.السائق_هوية_رقم}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-section">
                  <label>Plate #</label>
                  <input
                    type="text"
                    name="اللوحة_رقم"
                    value={driverData.اللوحة_رقم}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-section">
                  <label>Vehicle #</label>
                  <input
                    type="text"
                    name="المركبة_رقم"
                    value={driverData.المركبة_رقم}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-section">
                <label>Company</label>
                <input
                  type="text"
                  name="شركة_النقل_اسم"
                  value={driverData.شركة_النقل_اسم}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginTop: '25px' }}>
                <button type="button" onClick={handleUpdate} className="btn btn-primary" style={{
                marginTop: '20px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#064db9',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
          
                transition: 'background-color 0.3s ease',
              }}>Save</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary"style={{
                marginTop: '20px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#064db9',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
             marginLeft:'10px',
                transition: 'background-color 0.3s ease',
              }}>Cancel</button>
              </div>
            </form>
          ) : (
            <div>
         
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Driver Name</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nationality</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Mobile #</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Iqama #</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Plate #</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Vehicle #</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Company</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.السائق_اسم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.السائق_جنسية}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.السائق_جوال}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.السائق_هوية_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.اللوحة_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.المركبة_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{driverData.شركة_النقل_اسم}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => setEditing(true)} style={{
                marginTop: '20px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#064db9',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}>
                Update
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDetails;
