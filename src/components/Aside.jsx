import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Ensure this CSS file matches your styling
import '../styles/aside.css';
import logo from '../images/supplychain logo.png'
const Aside = ({ isNavVisible }) => {
    const asideRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isNavVisible && asideRef.current && !asideRef.current.contains(event.target)) {
                    document.querySelector('.sidebar').classList.add('sidebar-hide');
            }
        };

        if (isNavVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
    }, [isNavVisible]);

    return (
        <aside
            ref={asideRef}
            className={`sidebar ${!isNavVisible ? 'sidebar-hide' : ''}`}
        >
            <div className="sidebar-header d-flex">
                <img src={logo} alt="logo" style={{width:"80px",height:"80px"}}/>
                
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/rawmaterials">Raw Materials</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    <li><Link to="/suppliers">Suppliers</Link></li>
                    <li><Link to="/Productions">Productions</Link></li>
                    <li><Link to="/PurchaseOrders">Purchase Orders</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;
