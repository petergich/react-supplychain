import React, { useState } from 'react';
import '../styles/modal.css'; // Adjust the path as needed
import apiService from '../service/apiService';

const CustomerModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    // Handle saving logic here, e.g., calling an API or updating state
    try{
    const response = await apiService.createCustomer({"name":name,"phone":number})
    alert("successfull")
    }catch(error){
        alert(error)
    }
    setName('');
    setNumber('');
    window.location.reload()// Close the modal after saving
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay-product">
      <div className="modalProduct">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Customer</h2>
        <form onSubmit={handleSave}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          
          <label htmlFor="number">Phone Number:</label>
          <input 
            type="text" 
            id="number" 
            value={number} 
            onChange={(e) => setNumber(e.target.value)} 
            required 
          />
          
          <div className="d-flex">
          <button type="button" className="btn btn-warning m-3" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-primary m-3">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
