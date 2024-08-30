// src/pages/ConfirmPasswordPage.js
import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../service/apiService';
import '../styles/PasswordReset.css';


const ConfirmPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@example.com'; // Replace with actual email logic
  const [token, setToken] = useState('')
  // Extract token from the URL
  
  useEffect(() =>{
    const queryParams = new URLSearchParams(location.search);
    const tokenparam = queryParams.get('token');
  if(tokenparam){
    setToken(tokenparam)
  }else{
    alert("Invalid link")
    navigate("/emailverification")
    
  }
},[location.search])

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Make sure the token is included in the request
    apiService.confirmResetPassword({ "password":newPassword, "token":token })
      .then(response => {

        if (response.data === "Password reset successful") {
          alert("Your password has been reset successfully.");
          navigate("/"); // Navigate back to login after successful password reset
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          alert('No response received from the server.');
        } else {
          alert(`Error: ${error.message}`);
        }
        console.error('Password reset error:', error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handlePasswordReset}>
        <h1>Reset Password</h1>
        <input 
          type="text" 
          value={email} 
          readOnly
          className="email-field"
        />
        <input 
          type="password" 
          placeholder="Enter new password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm new password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ConfirmPasswordPage;
