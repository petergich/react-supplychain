import React, { useState, useEffect } from 'react';
import '../styles/modal.css'; // Adjust the path as needed

const UpdateCustomerModal = ({ isVisible, onClose, customer }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setNumber(customer.number || '');
    }
  }, [customer]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle update logic here, e.g., calling an API or updating state
    alert(`Customer Updated: Name - ${name}, Number - ${number}`);
    onClose(); // Close the modal after updating
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay-product">
      <div className="modalProduct">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Customer</h2>
        <form onSubmit={handleUpdate}>
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
          
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerModal;
