import React, { useEffect, useState } from 'react';git 
import { useParams } from 'react-router-dom';
import apiService from '../service/apiService'; // Adjust the path as necessary
import Aside from '../components/Aside';


const ProductsOrderDetails = () => {
  const [poId,setPoId]=useState(null);
  const [products, setProducts] = useState([]);
  const [isNavVisible, setNavVisible] = useState(true);


  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };
  useEffect(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const item = urlParams.get('po');
  console.log(item)
  setPoId(item)

    
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
          <section className="inventory-table">
            <table>
              <thead>
                <tr style={{ color: 'brown' }}>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
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

export default ProductsOrderDetails;
