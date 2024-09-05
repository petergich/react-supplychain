import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import '../styles/App.css';
import Aside from '../components/Aside';
import SupplierModal from '../components/SupplierModal';
import UpdateSupplierModal from '../components/updateSupllierModal';
import apiService from '../service/apiService';

const Suppliers = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [inventory, setInventory] = useState([]); 
  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  const showSupplierModal = () => {
    setSupplierModalVisible(true);
  };

  const hideSupplierModal = () => {
    setSupplierModalVisible(false);
  };
  const getSuppliers = async () => {
    try {
      const response = await apiService.getAllSupplier();
      setSupplier(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  };
const getPurchaseOrders= (supplier) =>{
  return 0
}

  const deleteSupplier = (id) => {
    apiService.deleteSupplier(id)
      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(error => {
        alert(error);
      });
  };

  const toggleSupplierUpdateModal = (item) => {
     setSelectedSupplier(item);
     setUpdateVisible(!isUpdateVisible);
   };

  useEffect(() => {
   getSuppliers();
  }, []);

  return (
    <div className="dashboard-container">
      <Aside isNavVisible={isNavVisible} />
      <main className="main-content">
        <header className="main-header">
          <div className="d-flex">
            <button className="toggle-btn mr-2" onClick={toggleNavbar}>
              <i style={{ color: "aqua" }} className="fa-solid fa-bars"></i>
            </button>
            <h1 className="top-text"><i className="fas fa-users"></i> Suppliers</h1>
          </div>
          <h1 className="top-text">Username</h1>
        </header>
        <div className="content">
          <div className="header-buttons">
            <button className="btn btn-secondary" onClick={showSupplierModal}>
              Add New
            </button>
          </div>

          <section className="inventory-table">
            <table>
              <thead>
                <tr style={{ color: "brown" }}>
                  <th>Supplier Name</th>
                  <th>Supplier Location</th>
                  <th>Supplier Phone</th>
                  <th>Purchase Orders</th>
                  <th>Update</th>
                  <th><i className="fas fa-trash"></i></th>
                </tr>
              </thead>
              <tbody>
                {supplier.map((item, index) => (
                  <tr key={index}>
                    <td> <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> {/* Product logo */}{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.phone}</td>
                    <td> {getPurchaseOrders(item)} </td>
                    <td> 
                      <button 
                        className="update_button" 
                         onClick={() => toggleSupplierUpdateModal(item)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button 
                        className="delete_button mr-3" 
                        onClick={() => deleteSupplier(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      <SupplierModal 
        isVisible={isSupplierModalVisible} 
        onClose={hideSupplierModal} 
        onSupplierAdded={(newSupplier) => setInventory([...inventory, newSupplier])}
      />

      <UpdateSupplierModal
        isVisible={isUpdateVisible}
        onClose={toggleSupplierUpdateModal}
        supplier={selectedSupplier}
      /> 
    </div> 
  );
};

export default Suppliers;
