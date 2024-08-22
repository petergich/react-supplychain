import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/modal.css';

// Ensure that Modal.setAppElement is called for accessibility
Modal.setAppElement('#root');

const AddRawMaterialModal = ({ isOpen, onClose, rawMaterials, onSave }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (selectedMaterial && quantity && price) {
      onSave({ id: selectedMaterial, quantity, price });
      onClose();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Raw Material"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Add Raw Material</h2>
      <div className="modal-body">
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="" disabled>Select Raw Material</option>
          {/* {rawMaterials.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))} */}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddRawMaterialModal;
