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
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
