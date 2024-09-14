 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import '../styles/App.css';
import Aside from '../components/Aside';
import CustomerModal from '../components/customersModal'; 
import UpdateCustomerModal from '../components/updatecustomerModal';
import apiService from '../service/apiService';

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [isCustomerModalVisible, setCustomerModalVisible] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  const showCustomerModal = () => {
    setCustomerModalVisible(true);
  };

  const hideCustomerModal = () => {
    setCustomerModalVisible(false);
  };

  const getCustomers = async () => {
    try {
      const response = await apiService.getAllCustomers();
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleCustomerUpdateModal = (item) => {
    // setSelectedCustomer(item);
    setUpdateVisible(!isUpdateVisible);
  };

  useEffect(() => {
    getCustomers();
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
            <h1 className="top-text"><i className="fas fa-users"></i> Customer</h1>
          </div>
          <h1 className="top-text"><i className="fas fa-user" style={{ marginRight: '8px' }}/>{apiService.getUsername()}</h1>
        </header>
        <div className="content">
          <div className="header-buttons">
            <button className="btn btn-secondary" onClick={showCustomerModal}>
              Add New
            </button>
          </div>

          <section className="inventory-table">
            <div className='table-responsive'>
            <table className='table '>
              <thead>
                <tr style={{ color: "brown" }}>
                  <th>Customer Name</th>
                  <th>Customer Phone</th>
                  <th>Update</th>
                  <th><i className="fas fa-trash"></i></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td> <i className="fas fa-users" style={{ marginRight: '8px' }}></i> {/* Product logo */}{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <button onClick={() => toggleCustomerUpdateModal(customer)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this customer?')) {
                          apiService.deleteCustomer(customer.id)
                            .then(() => getCustomers())
                            .catch(error => alert(error.message));
                        }
                      }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        </div>
      </main>

      {/* Customer Modal */}
      <CustomerModal 
        isVisible={isCustomerModalVisible} 
        onClose={hideCustomerModal} 
      />

      {/* Update Customer Modal */}
      <UpdateCustomerModal
        isVisible={isUpdateVisible}
        onClose={() => setUpdateVisible(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default Customer;
