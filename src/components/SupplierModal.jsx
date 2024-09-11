import React, { useState } from 'react';
import apiService from '../service/apiService';
import '../styles/modal.css'

const SupplierModal = ({ isVisible, onClose, onSupplierAdded }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createSupplier({ "name": name, "location": location, "phone": phone })
      alert("successfull")
    } catch (error) {
      alert(error)
    }
    setName('');
    setPhone('');
    setLocation('');
    window.location.reload()
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className='modalProduct'>
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
          <div className="d-flex">
            <button type="button" className="btn btn-secondary m-3" onClick={onClose}>Close</button>
            <button type="submit" className="btn btn-primary m-3">Confirm</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
