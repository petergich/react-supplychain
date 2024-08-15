import React, { useState } from 'react';
import apiService from '../service/apiService';
import "../styles/modal.css"


const SupplierModal = ({onClose,isVisible}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('')
 
  
  const handleSave = () => {
   
    
    apiService.createProduct({"name":name,"price":price,"category":category})
    .then (response => {
      
  
      window.location.reload()


    })
    .catch(error => {
      alert(error)
    });
    onClose();
  };

 if(!isVisible){
    return null;
 }

  return (
    <div className="modal-overlay-product">

      <div className="modalProduct">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Supplier</h2>
        <form>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <label>Price</label>
                <div className="input-group mb-3">
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
          <br />
          <label>Category:</label>
          <div className="input-group mb-3">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option  selected disabled>Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          </div>
          <br />
          <div className="d-flex">
          <button type="button" className="btn btn-warning m-3" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-primary m-3"onClick={handleSave}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
