import React, { useState } from 'react';
import '../styles/modal.css';
import apiService from '../service/apiService';

const Modal = ({ isVisible, onClose,item }) => {
  const [quantity, setQuantity] = useState(null);
  

  const handleSave = (e) => {
    e.preventDefault();
    apiService.updateRawMaterialStock({"id":item,"quantity":quantity})
      .then(response => {
        window.location.reload()
        
        setQuantity(null); // Clear the input field
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
    <div className="modal-overlay">
      <div className="modalProduct">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update stock</h2>
        <form onSubmit={handleSave}>
        <div className="form-group">
        <label htmlFor="price">Quantity:</label><br/>
          <input
          className="form-control"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required // Optional: add validation to make the field required
          />
          <div>
            <p style={{color:"blue"}}>
              The quantity you enter<br/>
              will be incremented<br/>
              directly to the existing item quantity
            </p>
          </div>
          </div>
          <div className="d-flex">
          <button type="button" className="btn btn-warning m-3" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-secondary m-3"onClick={handleSave}>Update</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Modal;
