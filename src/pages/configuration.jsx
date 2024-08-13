import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import '../styles/App.css';
import apiService from '../service/apiService';
import { useNavigate } from 'react-router-dom';
import RawMaterialProportionModal from "../components/rawMaterialProportionModal";
import Aside from '../components/Aside';
import RawMaterialProportionService from '../service/RawMaterialProportionService';


const Configuration = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [rawMaterialProportions, setRawMaterials] = useState([]);
  
  // State variables for input fields and button enablement
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [newProportionModal, setNewProportionModal] = useState(false)
  const [isNavVisible, setNavVisible] = useState(true);
  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
};


  const getItems = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const item = urlParams.get('product');
  

    if (item) {
      apiService.getProductRawMaterials(item)
        .then(response => {
          setRawMaterials(response.data);
        })
        .catch(error => {
          alert("Error in fetching the product", error);
          navigate("/home");
        });

      apiService.getProductById(item)
        .then(response => {
          setProduct(response.data);
          // Initialize input fields with fetched product data
          setProductName(response.data.name);
          setPrice(response.data.price);
        })
        .catch(error => {
          alert("Error in finding the product:", error);
        });
    } else {
      alert("No product found");
      navigate("/home");
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  const deleteRawMaterialProportion = async (id) =>{
    try{
  const response = await RawMaterialProportionService.deleteRawMaterialProportion(id) 
  alert(response.data)
  window.location.reload()
    }catch(error){
      alert(error)
    }
  }
  //create new proportion
  const toggleNewProportion = () => {
    setNewProportionModal(true)
  }
  // Handle input changes
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const closeProportionModal = () =>{
    setNewProportionModal(false)
  }
  // Enable/Disable save button based on input changes
  const updateProduct = async () => {
    var item = {"id":product.id, "price":price,"name":productName}
    console.log(item)
    try{
      
    const response = await apiService.updateProduct(item);
    if(response){
      alert("Updated successfully")
      window.location.reload()
    }
  }catch (error){
    alert(error)
  }
  }
  useEffect(() => {
    if (productName !== product.name || price !== product.price) {
      if(productName !=='' && price !== ''){
      setIsSaveEnabled(true);
      }else{
        setIsSaveEnabled(false);
      }
    } else {
      setIsSaveEnabled(false);
    }
  }, [productName, price, product.name, product.price]);

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
          <h1 className="top-text"><i className="fas fa-edit"></i>  Configurations</h1>
          </div>
          <h1 className="top-text">Username</h1>

        </header>
        <div className='content'>
          <div className='container'>
          <div className="container d-flex justify-between mb-4">
            <div className="card" style={{ width: "18rem" }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span style={{ color: "black" }} className="input-group-text" id="basic-addon1">Product:</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={productName}
                      onChange={handleProductNameChange}
                      placeholder={productName?productName:"Loading.."}
                      aria-label="Product"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span style={{ color: "black" }} className="input-group-text" id="basic-addon1">Stock:</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      value={product.quantity?product.quantity:"Loading..."}
                      placeholder="Stock"
                      disabled
                      aria-label="Stock"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span style={{ color: "black" }} className="input-group-text" id="basic-addon1">Price:</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      value={price?price:"Loading"}
                      onChange={handlePriceChange}
                      placeholder="Price"
                      aria-label="Price"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span style={{ color: "black" }} className="input-group-text" id="basic-addon1">Category</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={product.category ? product.category.name : 'loading...'}
                      placeholder="Category"
                      disabled
                      aria-label="Category"
                      aria-describedby="basic-addon1"
                    />  ``
                  </div>
                </li>
                <li className="list-group-item">
                  <button
                    className="btn btn-primary align-self-center"
                    onClick={updateProduct}
                    disabled={!isSaveEnabled}
                  >
                    Update
                  </button>
                </li>
              </ul>
            </div>
            <div className ="card">
              <table className="table table-bordered">
                <thead>
                  <th scope="col">Production</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </thead>

              </table>
            </div>
            </div>
            </div>
            <div className="card mt-4 p-2">
              <div className='flex-end p-3'>
                <button onClick={toggleNewProportion}className="btn btn-primary">Add new Proportion</button>
              </div>
              <table className="table table-bordered table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Raw Material</th>
                    <th scope="col">Proportion</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterialProportions.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.rawMaterial.name}</td>
                      <td>{item.propotion}</td>
                      <td>{item.rawMaterial.quantity}</td>
                      <td><button className="btn btn-primary">Edit</button></td>
                      <td><button onClick={()=>deleteRawMaterialProportion(item.id)}className="btn btn-warning">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         
        </div>
      </main>
      <RawMaterialProportionModal
      isVisible = {newProportionModal}
      onClose ={closeProportionModal}
      item = {product.id}
      />

    </div>
  );
};



export default Configuration;
