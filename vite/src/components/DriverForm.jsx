//vite/src/components/Form.jsx
import React from 'react';
import axios from 'axios';
import './Form.css';

const DriverForm = ({ formData, handleChange }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/forms', { formData, passengers });
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    }
  };

  return (
    <div id="pdf-content" style={{ margin: '100px' }}>
      <form onSubmit={handleSubmit}>
     
        <h2 className='h'><b>Driver Details</b></h2>
        <div className="form-row">
          <div className="form-section">
            <label className="label-colored">اسم السائق</label>
            <input type="text" name="السائق_اسم" value={formData.السائق_اسم} onChange={handleChange} />
          </div>
          <div className="form-section">
            <label className="label-colored">جنسية السائق</label>
            <input type="text" name="السائق_جنسية" value={formData.السائق_جنسية} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-section">
            <label className="label-colored">جوال السائق</label>
            <input type="text" name="السائق_جوال" value={formData.السائق_جوال} onChange={handleChange} />
          </div>
          <div className="form-section">
            <label className="label-colored">رقم هوية السائق</label>
            <input type="text" name="السائق_هوية_رقم" value={formData.السائق_هوية_رقم} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-section">
            <label className="label-colored">رقم اللوحة</label>
            <input type="text" name="اللوحة_رقم" value={formData.اللوحة_رقم} onChange={handleChange} />
          </div>
          <div className="form-section">
            <label className="label-colored">رقم المركبة</label>
            <input type="text" name="المركبة_رقم" value={formData.المركبة_رقم} onChange={handleChange} />
          </div>
        </div>
        <div className="form-section">
          <label className="label-colored">اسم شركة النقل</label>
          <input type="text" name="شركة_النقل_اسم" value={formData.شركة_النقل_اسم} onChange={handleChange} />
        </div>

      </form>
    </div>
  );
};

export default DriverForm;
