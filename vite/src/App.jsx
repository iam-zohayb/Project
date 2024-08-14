import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './components/Form';
import Display from './components/Display';
import DriverDetails from './components/DriverDetails';
import Signup from './components/Signupp'; // Import the Signup component

import Login from './components/Login'
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
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
    إلى: '',
    السائق_اسم: '',
    السائق_جنسية: '',
    السائق_جوال: '',
    السائق_هوية_رقم: '',
    اللوحة_رقم: '',
    المركبة_رقم: '',
    شركة_النقل_اسم: '',
  });

  const [passengers, setPassengers] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePassengerChange = (index, event) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [event.target.name]: event.target.value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        رقم_المعتمر: '',
        اسم_المعتمر: '',
        جنسية: '',
      },
    ]);
  };

  return (
    <Router>
      <div className="App">
      
        <Routes>
       
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form" element={
            <Form
              formData={formData}
              passengers={passengers}
              handleChange={handleChange}
              handlePassengerChange={handlePassengerChange}
              addPassenger={addPassenger}
            />
          } />
          <Route path="/display" element={<Display />} />
          <Route path="/driver-details" element={<DriverDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
