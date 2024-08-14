import React, {useEffect, useState  } from 'react';
import '../styles/home.css';
import '../styles/App.css';
import { Link } from 'react-router-dom'; 
import Aside from '../components/Aside';
import PurchaseOrderService from '../service/PurchaseOrderService';


const Suppliers = () => {
  const [isNavVisible, setNavVisible] = useState(true);
  const [supplierModal, setSupplierModal] = useState(false)
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
  const showSupplierModal = () =>{
    setSupplierModal(true)
  }

  useEffect (() =>{
    

  },[])
  
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
          <h1 className="top-text"><i className="fas fa-warehouse"></i>  Suppliers</h1>
          </div>
          <h1 className="top-text">Username</h1>

        </header>
        <div className='content'>
        <div className="header-buttons">
            <button className="btn btn-secondary" onClick={showSupplierModal}>
              Add New
            </button>
          </div>

        <section className="inventory-table">
          <table>
            <thead>
              <tr style={{color:"brown"}}>
                <th>Supplier Name</th>
                <th>Supplier Location</th>
                <th>Supplier Phone</th>
                <th>Update</th>
                <th><i className='fas fa-trash'></i></th>
                
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </section>
        </div>
      </main>
     </div> 
  );
};

export default Suppliers;
