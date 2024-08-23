import React, { useEffect, useState } from 'react';
import '../styles/modal.css';
import apiService from '../service/apiService';

const PurchaseOrderModal = ({ isVisible, onClose, onSave }) => {
    const [poNumber, setPoNumber] = useState('');
    const [supplier, setSupplier] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState(true);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        const fetchSuppliers = async () => {
            try {
                const response = await apiService.getAllSupplier(); // Adjust the method call if necessary
                setSuppliers(response.data); // Adjust based on actual response structure
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.createPurchaseorder({
                "poNumber": poNumber,
                "supplierId": supplier,
                 "date":date,
                "delivered":status?"true":"false"
            });
            alert("Purchase Order added successfully");
            onSave(response.data); // Pass the new order to the parent component
        } catch (error) {
            alert("Error adding Purchase Order");
            console.error('Error creating purchase order:', error);
        }
        setPoNumber('');
        setSupplier('');
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setStatus('');
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modalProduct">
                <div className="modal-header">
                    <h2>Add Purchase Order</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>PO Number</label>
                            <input 
                                type="text" 
                                value={poNumber} 
                                onChange={(e) => setPoNumber(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Supplier</label>
                            <select 
                                value={supplier} 
                                onChange={(e) => setSupplier(e.target.value)} 
                                required
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((sup) => (
                                    <option key={sup.id} value={sup.id}>
                                        {sup.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
    <label>Status</label>
    <div className="checkbox-group">
        <input 
            type="checkbox" 
            id="status-checkbox" 
            checked={status ? true:false} 
            onChange={(e) => setStatus(e.target.checked ? true : false)} 
        />
        <label htmlFor="status-checkbox">Delivered</label>
    </div>
</div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrderModal;
