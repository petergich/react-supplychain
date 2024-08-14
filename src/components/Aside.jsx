import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Ensure this CSS file matches your styling
import '../styles/aside.css'


const Aside = ({isNavVisible}) => {
    

    return (
     
       
       
        <aside className={`${isNavVisible?'sidebar':'sidebar-hide'}`}>
                <div className="sidebar-header">
                    <h2>Supply Chain</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/rawmaterials">Raw Materials</Link></li>
                        <li><Link to="#">Categories</Link></li>
                        <li><Link to="#">Suppliers</Link></li>
                        <li><Link to="/customers">Customers</Link></li>
                        <li><Link to="/PurchaseOrders">Purchase Orders</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </nav>
            </aside>
        
    );
};

export default Aside;
