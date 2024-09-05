import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import apiService from '../service/apiService';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AddCategoryModal from '../components/AddCategoryModal';
import '../styles/App.css';
import Updatemodal from '../components/Updatemodal';
import EditModal from '../components/EditModal';
import Aside from '../components/Aside';
import ProduceModal from '../components/ProduceModal';
import $ from 'jquery'; // Ensure you have installed jquery using npm
import 'datatables.net';



const Home = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isUpdateVisible, setUpdateModal] = useState(false);
  const [isEditVisible, setEditModal] = useState(false);
  const [isProduceModalVisible, setIsProduceModalVisible] = useState(false)
  const [produceItem, setProduceItem] = useState(null);
  const [production, setProduction] = useState(null)
  const [isNavVisible, setNavVisible] = useState(false);
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
  //       alert(error.response ? error.response.data.message : 'Error checking token');
  //       console.error('Error checking token:', error);
  //     });
  // }, [navigate]);

  // Fetch products and categories from the API when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      setInventory(response.data.products);
    } catch (error) {

      console.error('Error fetching products:', error);
      // Handle the error appropriately
    }
  };
  const fetchCategories = async () => {
    try {

      const response = await apiService.getcategories();
      setCategories(response.data.categories)
    } catch (error) {

      console.error('error in fetching categories', error)
    }
  }
  const getLastProduction = async () => {
    const response = await apiService.getProductions()
    try {
      const productions = response.data
      const production = productions[productions.length - 1];
      console.log(production)
      setProduction(production)
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    fetchProducts();

    fetchCategories();
    getLastProduction();
    $('#myTable').DataTable();
  }, []);

  // Function to delete an inventory item by id
  const deleteInventoryItem = (id) => {
    apiService.deleteProduct(id)
      .then(() => {
        setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
      })
      .catch(error => {
        alert(error.response ? error.response.data.message : 'Error deleting product');
        console.error('Error deleting product:', error);
      });
  };
  const toggleProduceModal = (id) => {

    setProduceItem(id)
    setIsProduceModalVisible(true)
  }
  const closeProduceModal = () => {
    setIsProduceModalVisible(false)
  }
  // Function to toggle product modal visibility
  const openModal = () => {

    setModalVisible(true)


  };
  const closeModal = () => {

    setModalVisible(false)


  };



  // Function to toggle category modal visibility
  const toggleCategoryModal = () => setCategoryModalVisible(prev => !prev);

  const toggleUpdatemodal = () => setUpdateModal(prev => !prev);

  const toggleEditModal = () => setEditModal(prev => !prev);

  const selectProduct = (item) => {
    navigate(`/configuration?product=${encodeURIComponent(item)}`);
  };

  return (

    <div className="dashboard-container">

      <Aside
        isNavVisible={isNavVisible}
      />
      <main className="main-content">
        <header className="main-header">
          <div className='d-flex'>
            <button className="toggle-btn mr-2" onClick={toggleNavbar}>
              <i style={{ color: "aqua" }} className="fa-solid fa-bars"></i>
            </button>
            <h1 className="top-text"><i className="fas fa-home"></i>  Home</h1>
          </div>
          <h1 className="top-text">Username</h1>

        </header>
        <div className="content">
          <div className=" row justify-content-between m-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">
                <h4>Customer Orders</h4>
              </div>
              <div className='card-body'>
                <p>customer name<span>---</span></p>
                <p>Customer name<span>---</span></p>
                <p>Customer name<span>----</span></p>
                <div className="d-flex">
                  <button className="btn btn-primary w-auto">Manage</button>
                </div>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header d-flex">
                <h4><i class="fas fa-industry"></i>&nbsp; Last Production</h4>
              </div>
              <div className='card-body'>
                <p>Product:&nbsp;<span>{production ? production.product.name : "loading.."}</span></p>
                <p>quantity:&nbsp;<span>{production ? production.finalProductQuantity : "loading.."}</span></p>
                <p>date:&nbsp;&nbsp;&nbsp;&nbsp;<span>{new Date(production ? production.date : null).toLocaleDateString()}</span></p>
                <div className="d-flex">
                  <button className="btn btn-warning w-auto">view</button>
                </div>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">
                <h4>Recent Purchase order</h4>
              </div>
              <div className='card-body'>
                <p>PO Number:<span>---</span></p>
                <p>Supplier<span>---</span></p>
                <p>Date:<span>----</span></p>
                <div className="d-flex">
                  <button className="btn btn-warning w-auto">view</button>
                </div>
              </div>
            </div>
          </div>

          <section className="inventory-table">
            <div className="header-buttons">
              <button className="add-button mr-3" onClick={openModal}>
                Add New Product
              </button>
              <button className="add-button btn-warning" onClick={toggleCategoryModal}>
                Add Category
              </button>
            </div>
            <table className="table " id="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>actions</th>

                </tr>
              </thead>
              <tbody>
               
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <i className="fas fa-shopping-cart" style={{ marginRight: '8px' }}></i> {/* Product logo */}
                      {item.name}
                    </td>
                    <td>{item.category ? item.category.name : 'N/A'}</td>
                    <td>{item? item.quantity : 'N/A'}</td>
                    <td>Ksh {item.price ? item.price.toFixed(2) : 'N/A'}</td>
                    <td>
                      <button className="delete_button mr-3" onClick={() => deleteInventoryItem(item.id)}>Delete</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {
        isModalVisible ? <Modal

          onClose={closeModal}
          categories={categories}
        /> : null
      }

      <AddCategoryModal
        isVisible={isCategoryModalVisible}
        onClose={toggleCategoryModal}
      />
      <Updatemodal
        isVisible={isUpdateVisible}
        onClose={toggleUpdatemodal}
      />
      <EditModal
        isVisible={isEditVisible}
        onClose={toggleEditModal}
      />
      <ProduceModal
        isVisible={isProduceModalVisible}
        onClose={closeProduceModal}
        item={produceItem}

      />
    </div>
  );
};

export default Home;
