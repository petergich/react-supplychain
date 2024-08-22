import React, { useState, useEffect } from 'react';
import apiService from '../service/apiService';

const UpdateSupplierModal = ({ isVisible, onClose, supplier }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setLocation(supplier.location);
      setPhone(supplier.phone);
    }
  }, [supplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSupplier = { name, location, phone };

    apiService.updateSupplier(supplier.id, updatedSupplier)
      .then(response => {
        onClose();
      })
      .catch(error => {
        console.error('Error updating supplier:', error);
      });
  };

  if (!isVisible) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <label>
          Location:
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </label>
        <label>
          Phone:
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </label>
        <button type="submit">Update Supplier</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateSupplierModal;
