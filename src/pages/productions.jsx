import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import apiService from '../service/apiService';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import Aside from '../components/Aside';

const Productions = () => {
  const navigate = useNavigate();
  const [productions, setProductions] = useState([]);
  const [productionItem, setProductionItem] = useState(null);
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  // Fetch productions from the API when the component mounts
  const fetchProductions = async () => {
    try {
      const response = await apiService.getProductions();
      setProductions(response.data);
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  // Function to delete a production item by id
  


  return (
    <div className="dashboard-container">
      <Aside isNavVisible={isNavVisible} />
      <main className="main-content">
        <header className="main-header">
          <div className='d-flex'>
            <button className="toggle-btn mr-2" onClick={toggleNavbar}>
              <i style={{ color: "aqua" }} className="fa-solid fa-bars"></i>
            </button>
            <h1 className="top-text"><i className="fas fa-box"></i> Productions</h1>
          </div>
          <h1 className="top-text"><i className="fas fa-user" style={{ marginRight: '8px' }}/>{apiService.getUsername()}</h1>
        </header>
        <div className="content">
          <section className="inventory-table">
            <div className="header-buttons">
            </div>
            <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Production Id</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {productions?productions.map((item) => (
                
                  <tr key={item.id}>
                    <td><i class="fas fa-industry"></i>&nbsp;
                    {item.id?item.id:"loading.."}</td>
                    <td>{item.product?item.product.name:"loading.."}</td>
                    <td>{item.finalProductQuantity?item.finalProductQuantity:"loading.."}</td>
                    <td>{item.finished?"completed":"Not completed"}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                )):"Loading.."}
              </tbody>
            </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Productions;
