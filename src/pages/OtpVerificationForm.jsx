import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import '../styles/OtpVerificationForm.css';


const OtpVerificationForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, otp}; 

    // Include role in the user object
    apiService.verifyOtp(user)
      .then(response => {
        alert(response.data.message);
        if(response.data.message==="Verification Successful"){
          navigate('/login');
        }
      })
      .catch(error => {
        alert(error.response.message);
      });
  };

  return (
    <div className='otp-verification-container'> 
    <form className='otp-verification-form' onSubmit={handleSubmit}>
      <div>
        <label>Enter OTP:</label>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Verify OTP</button>
    </form>
    </div>
  );
};

export default OtpVerificationForm;
