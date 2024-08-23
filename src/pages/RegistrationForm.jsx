import React, { useState } from 'react';
import apiService from '../service/apiService';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [role, setRole] = useState('ROLE_MANAGER'); 
  const navigate = useNavigate();
  
  const handleCreateUser = (event) => {
    event.preventDefault();
    const user = { username, email, password};
    
    
    apiService.createUser(user)
      .then(response => {
        alert(response.data.message);
        if(response.data.message==="Check email for one-time password for verification"){
          navigate('/otpverification?username=' + encodeURIComponent(response.data.username));
        }
      })
      .catch(error => {
        alert(error.response);
      });
  };

  return (
    <div className="registration-container">
      <form id ="form"className='regidtration-form' onSubmit={handleCreateUser}>
      <h1>Create User</h1> 
      <div className='input-group'> 
      <span className="input-icon">👤</span>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      </div>
      <div className='input-group'>
        <span className='input-icon'>📧</span>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
           </div>
           <div className='input-group'> 
          <span className='input-icon'> 🔒</span>
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
       </div>
       
      <button >Create User</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
