import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import '../styles/App.css';
import Aside from '../components/Aside';
import PurchaseOrderModal from '../components/newpurchaseorder';
import apiService from '../service/apiService';
import { Link } from 'react-router-dom';

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [isPurchaseOrderModalVisible, setPurchaseOrderModalVisible] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  const showPurchaseOrderModal = () => {
    setPurchaseOrderModalVisible(true);
  };

  const hidePurchaseOrderModal = () => {
    setPurchaseOrderModalVisible(false);
  };

  const getPurchaseOrders = async () => {
    try {
      const response = await apiService.getAllPurchaseOrders();
      setPurchaseOrders(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deletePurchaseOrder = (id) => {
    apiService.deletePurchaseOrder(id)
      .then(response => {
        setPurchaseOrders(purchaseOrders.filter(item => item.id !== id));
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleSetToDelivered = async (id) => {
    try {
      await apiService.setToDelivered({'id':id,'delivered':true});
      window.location.reload()
      ;
    } catch (error) {
      alert(`Error updating purchase order to delivered: ${error.message}`);
    }
  };
  const selectProduct = (id) => {
    navigate(`/purchaseorderdetails?po=`+encodeURIComponent(id));
  };
  

  useEffect(() => {
    getPurchaseOrders();
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
            <h1 className="top-text"><i className="fas fa-receipt"></i> Purchase Orders</h1>
          </div>
          <h1 className="top-text">Username</h1>
        </header>
        <div className="content">
          <div className="header-buttons">
            <button className="btn btn-secondary" onClick={showPurchaseOrderModal}>
              New Purchase Order
            </button>
          </div>

          <section className="inventory-table">
            <table>
              <thead>
                <tr style={{ color: "brown" }}>
                  <th>PO Number</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th><i className="fas fa-trash"></i></th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((item, index) => (
                  <tr key={index}>
                    <td> <p onClick={() => selectProduct(item.id)}style={{ cursor: 'pointer' }}> <i className="fas fa-receipt" style={{ marginRight: '8px' }}></i> {/* Product logo */} {item.poNumber}</p>
</td>                    <td>{item.supplier.name ? item.supplier.name : 'N/A'}</td>
                    <td>{item.date}</td>
                    <td>
                      {item.delivered ? 'Delivered' : 
                        <button 
                          className="btn btn-success" 
                          onClick={() => handleSetToDelivered(item.id)}
                        >
                          Set to Delivered
                        </button>
                      }
                    </td>
                    <td>
                      <button 
                        className="update_button" 
                        //onClick={() => togglePurchaseOrderUpdateModal(item)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button 
                        className="delete_button mr-3" 
                        onClick={() => deletePurchaseOrder(item.id)}
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

      <PurchaseOrderModal 
        isVisible={isPurchaseOrderModalVisible} 
        onClose={hidePurchaseOrderModal} 
        onSave={(newOrder) => setPurchaseOrders([...purchaseOrders, newOrder])}
      />
    </div> 
  );
};

export default PurchaseOrders;
