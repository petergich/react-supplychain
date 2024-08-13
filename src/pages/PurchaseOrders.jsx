import React, {useEffect, useState  } from 'react';
import '../styles/home.css';
import '../styles/App.css';
import { Link } from 'react-router-dom'; 
import Aside from '../components/Aside';
import PurchaseOrderService from '../service/PurchaseOrderService';


const PurchaseOrders = () => {
  const [isNavVisible, setNavVisible] = useState(true);
  const [PurchaseOrders, setPurchaseOrders] = useState([])
  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
};

  // Check token when the component mounts
  // useEffect(() => {
  //   apiService.checktoken(localStorage.getItem('token'))
  //     .then(response => {
  //       if (response.data.message !== 'valid') {
  //         navigate('/login');
  //       }
  //     })
  //     .catch(error => {
  //       navigate('/login');
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       } else if (error.request) {
  //         alert('No response received from the server.');
  //       } else {
  //         alert(`Error: ${error.message}`);
  //       }
  //       console.error('Error checking token:', error);
  //     });
  // }, [navigate]);

  useEffect (() =>{
    const getPurchaseOrders = async () => {
      try{
      const response = await PurchaseOrderService.getAllPurchaseOrders()
      
      setPurchaseOrders(response)
      console.log(response)
      
    }catch(error){
      console.log(error)
    }
    };
    getPurchaseOrders()

  },[])
  const completePurchaseOrder = async() =>{
    
  }

  return (
    <div className="dashboard-container">
       <Aside
      isNavVisible={isNavVisible}
      />
      <main className="main-content">
      <header className="main-header">
          <div className='d-flex'>
          <button className="toggle-btn mr-2" onClick={toggleNavbar}>
          <i style={{color:"aqua"}}className="fa-solid fa-bars"></i>
          </button>
          <h1 className="top-text"><i className="fas fa-home"></i>  Purchase Orders</h1>
          </div>
          <h1 className="top-text">Username</h1>

        </header>
        <div className='content'>
        <div className="header-buttons">
            <button className="add-button mr-3">
              New Purchase Order
            </button>
          </div>

        <section className="inventory-table">
          <table>
            <thead>
              <tr style={{color:"brown"}}>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Status</th>
                <th><i className='fas fa-trash'></i></th>
                
              </tr>
            </thead>
            <tbody>
              {PurchaseOrders.map((item, index) => (
                <tr key={index}>
                  <td>{item.poNumber}</td>
                  <td>{item.supplier.name ? item.supplier.name : 'N/A'}</td>
                  <td>{item.date}</td>
                  <td>{item.delivered ? <button disabled className='btn btn-success'>Delivered</button>: <button className="btn btn-warning">Complete</button>}</td>
                  <td><button className='btn btn-danger'>delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        </div>
      </main>
     </div> 
  );
};

export default PurchaseOrders;
