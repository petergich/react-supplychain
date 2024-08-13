import React, { useState } from 'react';
import '../styles/modal.css';
import apiService from '../service/apiService';

const Modal = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  

  const handleSave = (e) => {
    alert("called")
    e.preventDefault();
    apiService.createcategory({ name })
      .then(response => {
        alert('Successful');
        
        setName(''); // Clear the input field
        onClose(); // Optionally close the modal
      })
      .catch(error => {
        alert('Error');
      });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit name </h2>
        <form onSubmit={handleSave}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Optional: add validation to make the field required
          />
          <h2>Edit price </h2>
          </form>
        <form onSubmit={handleSave}>
          <label>:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Optional: add validation to make the field required
          />
          <br />
          <br />
          <button type="submit" onClick={handleSave}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
