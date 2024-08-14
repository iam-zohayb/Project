import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';
import Navbar from './Navbar';
import ComboBox from './ComboBox';
const Form = () => {
  const [statementNo, setStatementNo] = useState('');
  const [formData, setFormData] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formResults, setFormResults] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);
  const printPDF = async (form) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/${form._id}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/${statementNo}`);
      setFormResults(response.data);
      setFormData(response.data.formData);
      setPassengers(response.data.passengers);
      setEditing(false);
    } catch (error) {
      console.error('Error fetching form data:', error);
      alert('Form not found.');
    }
  };

  const handleNew = () => {
    setStatementNo('');
    setFormData({
      تاريخ: '',
      الكشف_تاريخ: '',
      الكشف_رقم: '',
      شركة_العمرة_اسم: '',
      شركة_العمرة_رقم: '',
      الجنسية: '',
      المعتمرين_عدد: '',
      الرحلة_رقم: '',
      من: '',
      الرحلة_تاريخ: '',
      الناقل: '',
      المنفذ: '',
      الرحلة_وقت: '',
      إلى: ''
    });
    setPassengers([]);
    setSelectedDriver(null);
    setEditing(true);
  };

  const handleDriverChange = (event) => {
    const driverId = event.target.value;
    const driver = drivers.find(driver => driver._id === driverId);
    setSelectedDriver(driver);
  };

  const handleDriverSelect = (selectedDriver) => {
    setSelectedDriver(selectedDriver);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePassengerChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { رقم_المعتمر: '', اسم_المعتمر: '', جنسية: '' }]);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formResults) {
        await axios.put(`http://localhost:5000/api/forms/${statementNo}`, {
          formData: {
            ...formData,
            السائق_اسم: selectedDriver?.السائق_اسم || '',
            السائق_جنسية: selectedDriver?.السائق_جنسية || '',
            السائق_جوال: selectedDriver?.السائق_جوال || '',
            السائق_هوية_رقم: selectedDriver?.السائق_هوية_رقم || '',
            اللوحة_رقم: selectedDriver?.اللوحة_رقم || '',
            المركبة_رقم: selectedDriver?.المركبة_رقم || '',
            شركة_النقل_اسم: selectedDriver?.شركة_النقل_اسم || ''
          },
          passengers
        });
      } else {
        await axios.post('http://localhost:5000/api/forms', {
          formData: {
            ...formData,
            السائق_اسم: selectedDriver?.السائق_اسم || '',
            السائق_جنسية: selectedDriver?.السائق_جنسية || '',
            السائق_جوال: selectedDriver?.السائق_جوال || '',
            السائق_هوية_رقم: selectedDriver?.السائق_هوية_رقم || '',
            اللوحة_رقم: selectedDriver?.اللوحة_رقم || '',
            المركبة_رقم: selectedDriver?.المركبة_رقم || '',
            شركة_النقل_اسم: selectedDriver?.شركة_النقل_اسم || ''
          },
          passengers
        });
      }
      alert('Data saved successfully!');
      setEditing(false);
      setFormData(null);
      setPassengers([]);
      setStatementNo('');
      setFormResults(null);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    }
  };

  return (
    <>
      <Navbar />
      <div id="pdf-content" style={{ }}>
        <h2 style={{ fontSize: '25px' }}><b>Search Form</b></h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Statement #"
            value={statementNo}
            onChange={(e) => setStatementNo(e.target.value)}
          />
          <button onClick={handleSearch} style={{ margin: '10px' }}>Go</button>
          <button onClick={handleNew}>New</button>
        </div>

        {formResults && !editing && formData && (
          <div>
            <h2 className='h'><b>Disclosure Statement Details</b></h2>
            <table className="form-table">
  <tbody>
    <tr>
      <td>Date</td>
      <td>{formData.تاريخ}</td>
      <td>Statement Date</td>
      <td>{formData.الكشف_تاريخ}</td>
    </tr>
    <tr>
      <td>Statement #</td>
      <td>{formData.الكشف_رقم}</td>
      <td>Umrah Company Name</td>
      <td>{formData.شركة_العمرة_اسم}</td>
    </tr>
    <tr>
      <td>Umrah Company #</td>
      <td>{formData.شركة_العمرة_رقم}</td>
      <td>Nationality</td>
      <td>{formData.الجنسية}</td>
    </tr>
    <tr>
      <td>Pilgrims Quantity</td>
      <td>{formData.المعتمرين_عدد}</td>
      <td>Flight #</td>
      <td>{formData.الرحلة_رقم}</td>
    </tr>
    <tr>
      <td>From City</td>
      <td>{formData.من}</td>
      <td>Trip Date</td>
      <td>{formData.الرحلة_تاريخ}</td>
    </tr>
    <tr>
      <td>Transporter</td>
      <td>{formData.الناقل}</td>
      <td>Port</td>
      <td>{formData.المنفذ}</td>
    </tr>
    <tr>
      <td>Trip Time</td>
      <td>{formData.الرحلة_وقت}</td>
      <td>To City</td>
      <td>{formData.إلى}</td>
    </tr>
  </tbody>
</table>


            <h2 className='h'><b>Driver Details</b></h2>
      
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
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.السائق_اسم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.السائق_جنسية}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.السائق_جوال}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.السائق_هوية_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.اللوحة_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.المركبة_رقم}</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formData.شركة_النقل_اسم}</td>
                  </tr>
                </tbody>
              </table>


            <h2 className='h'><b>Pilgrim Details</b></h2>
            <table className="">
              <thead>
                <tr>
                  <th>Umrah #</th>
                  <th>Pilgrim Name</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger, index) => (
                  <tr key={index}>
                    <td>{passenger.رقم_المعتمر}</td>
                    <td>{passenger.اسم_المعتمر}</td>
                    <td>{passenger.جنسية}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="button-container">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => printPDF(formResults)}>Print PDF</button>
            </div>
          </div>
        )}

        {editing && formData && (
          <form onSubmit={handleSubmit}>
            <h2 className='h'><b>Disclosure Statement Details</b></h2>
            <div className="form-row">
              <div className="form-section">
                <label className="label-colored">Date</label>
                <input type="date" name="تاريخ" value={formData.تاريخ} onChange={handleChange} />
              </div>
              <div className="form-section">
                <label className="label-colored">Statement Date</label>
                <input type="date" name="الكشف_تاريخ" value={formData.الكشف_تاريخ} onChange={handleChange} />
              </div>
              
            </div>

            <div className="form-row">
              <div className="form-section">
                <label className="label-colored">Statement #</label>
                <input type="text" name="الكشف_رقم" value={formData.الكشف_رقم} onChange={handleChange}   readOnly={!!formResults} />
              </div>
              <div className="form-section">
                <label className="label-colored">Umrah Company Name</label>
                <input type="text" name="شركة_العمرة_اسم" value={formData.شركة_العمرة_اسم} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label className="label-colored">Umrah Company #</label>
                <input type="text" name="شركة_العمرة_رقم" value={formData.شركة_العمرة_رقم} onChange={handleChange} />
              </div>
              <div className="form-section">
                <label className="label-colored">Nationality</label>
                <input type="text" name="الجنسية" value={formData.الجنسية} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
          <div className="form-section">
            <label className="label-colored">Pilgrims Quantity</label>
            <input type="number" name="المعتمرين_عدد" value={formData.المعتمرين_عدد} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label className="label-colored">Flight #</label>
            <input type="text" name="الرحلة_رقم" value={formData.الرحلة_رقم} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="label-colored">From City</label>
            <input type="text" name="من" value={formData.من} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label className="label-colored">Trip Date</label>
            <input type="date" name="الرحلة_تاريخ" value={formData.الرحلة_تاريخ} onChange={handleChange} />
          </div>
          </div>
          <div className="form-row">
          <div className="form-section">
            <label className="label-colored">Transporter</label>
            <input type="text" name="الناقل" value={formData.الناقل} onChange={handleChange} />
          </div>
          <div className="form-section">
            <label className="label-colored">Port</label>
            <input type="text" name="المنفذ" value={formData.المنفذ} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-section">
            <label className="label-colored">Trip time</label>
            <input type="time" name="الرحلة_وقت" value={formData.الرحلة_وقت} onChange={handleChange} />
          </div>
          <div className="form-section">
            <label className="label-colored">To City</label>
            <input type="text" name="إلى" value={formData.إلى} onChange={handleChange} />
          </div>
        </div>
        <h2 className='h'><b>Driver Details</b></h2>
      
            <div className="form-row">
              <div className="form-section">
            
                <ComboBox options={drivers} onSelect={handleDriverSelect} />
                
              </div>
            </div>

            <h3 className='h'><b>Pilgrims Information</b></h3>
            {passengers.map((passenger, index) => (
              <div key={index} className="passenger-row">
                <label className="label-colored" >Umrah Number</label>
                <input type="text" name="رقم_المعتمر" value={passenger.رقم_المعتمر} onChange={(event) => handlePassengerChange(index, event)} />
                <label className="label-colored" style={{marginLeft:'10px'}}>Pilgrim Name</label>
                <input type="text" name="اسم_المعتمر" value={passenger.اسم_المعتمر} onChange={(event) => handlePassengerChange(index, event)} />
                <label className="label-colored"style={{marginLeft:'10px'}}>Nationality</label>
                <input type="text" name="جنسية" value={passenger.جنسية} onChange={(event) => handlePassengerChange(index, event)} />
              </div>
            ))}

<div className="button-container">
            <button type="button" onClick={addPassenger}>Add Passenger</button>
            </div>
            <div className="button-container">
              <button type="submit">Save</button>
            </div>
          </form>
        )}
        
      </div>
    </>
  );
};

export default Form;
