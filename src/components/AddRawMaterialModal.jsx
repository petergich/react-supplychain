import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import apiService from "../service/apiService"; 

const AddRawMaterialModal = ({ isOpen, onClose, poID }) => {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await apiService.getRawMaterials(); 
        setRawMaterials(response.data.rawmaterials || []); 
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };
    fetchRawMaterials();
  }, []);

  const handleSave = () => {
    apiService.createRawMaterialOrder({
      'rawMaterialId': selectedMaterial, 
      'purchaseOrderId': poID, 
      'price': price, 
      'quantity': quantity
    })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modalProduct"
      overlayClassName="modal-overlay-product"
    >
      <h2>Add Raw Material</h2>
      <form>
        <div className="form-group">
          <label htmlFor="materialSelect">Raw Material</label><br/>
          <select
            className="form-data"
            id="materialSelect"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            required
          >
            <option value="" disabled>Select a material</option>
            {rawMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priceInput">Price</label>
          <input
            type="number"
            id="priceInput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantityInput">Quantity</label>
          <input
            type="number"
            id="quantityInput"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRawMaterialModal;
