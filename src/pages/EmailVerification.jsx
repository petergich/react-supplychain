import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import '../styles/EmailVerification.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert(email)
    apiService.ForgotPassword({"email":email})
      .then(response => { 
        console.log(response)
        if(response.data === "Email sent"){
          alert("Please check your email for password reset instructions.");
          navigate("/PasswordReset"); // Navigate back to login after successful reset
        } else {
          //alert(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
        alert(error.response.data)
          alert(error.response);
        } else if (error.request) {
          alert('No response received from the server.');
        } else {
          alert(`Error: ${error.message}`);
        }
        console.error('Reset password error:', error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleReset}>
        <h1>Enter email to reset your password</h1>
        <input 
          type="email" 
          placeholder="Enter your email"  
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Send email</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
