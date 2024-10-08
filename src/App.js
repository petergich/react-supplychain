import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import RegistrationForm from './pages/RegistrationForm';
import OtpVerificationForm from './pages/OtpVerificationForm';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PurchaseOrders from './pages/PurchaseOrders';
import Rawmaterials from './pages/rawmaterials';
import Configuration from './pages/configuration';
import Admin from "./pages/admin"
import Products from './pages/products';
import Suppliers from './pages/Suppliers';
import Customers from './pages/customers';
import PurchaseOrderDetails from './pages/PurchaseOrderDetails';
import Productions from './pages/productions';
import Emailverification from './pages/EmailVerification';
import PasswordReset from './pages/PasswordReset';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/otpverification" element={<OtpVerificationForm />} />
            <Route path="" element={<LoginPage/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path='/PurchaseOrders' element={<PurchaseOrders/>} />
            <Route path='/rawmaterials' element= {<Rawmaterials/>}/>
            <Route path='/configuration' element={<Configuration/>}/>
            <Route path = "/admin" element={<Admin/>}/>
            <Route path = "/products" element={<Products/>}/>
            <Route path = "/suppliers" element={<Suppliers/>}/>
            <Route path = "/customers" element={<Customers/>}/>
            <Route path="/purchaseorderdetails" element={<PurchaseOrderDetails />} />
            <Route path = "/Productions" element={<Productions/>}/>
            <Route path ="/Emailverification" element={<Emailverification/>}></Route>
            <Route path ="/PasswordReset" element={<PasswordReset/>} />

            
            
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
