import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../service/apiService"; // Adjust the path as necessary
import Aside from "../components/Aside";
import AddRawMaterialModal from "../components/AddRawMaterialModal"; // Adjust the path as necessary

const PurchaseOrderDetails = () => {
  const navigate = useNavigate();
  const [rawMaterials, setRawMaterials] = useState([]);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [isNavVisible, setNavVisible] = useState(false);
  const [poID, setpoId]= useState(null);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const poId = urlParams.get("po");
    setpoId(poId);

    const fetchRawMaterials = async (id) => {
      try {
        
        const response = await apiService.getRawMaterialOrdersByPo(id);
        
        
        console.log(response.data);
        setRawMaterials(response.data)
      }
      catch(error){
        console.log(error)

      }
    }
    const fetchPurchaseOrder = async () => {
      try {
        const response = await apiService.getPurchaseOrderById(poId);
        setPurchaseOrder(response.data);
      } catch (error) {
        console.error("Error fetching purchase order:", error);
      }
    };
    fetchRawMaterials(poId)
    fetchPurchaseOrder();
  }, []);

  const deletePurchaseOrder = async (id) => {
    try {
      await apiService.deletePurchaseOrder(id);
    } catch (error) {
      alert(error);
    }
  };
  

  const handleSetToDelivered = async (id) => {
    try {
      await apiService.setToDelivered({ id, delivered: true });
      window.location.reload();
    } catch (error) {
      alert(`Error updating purchase order to delivered: ${error.message}`);
    }
  };
  

  return (
    <div className="dashboard-container">
      <Aside isNavVisible={isNavVisible} />
      <main className="main-content">
        <header className="main-header">
          <div className="d-flex">
            <button className="toggle-btn mr-2" onClick={toggleNavbar}>
              <i style={{ color: "aqua" }} className="fa-solid fa-bars"></i>
            </button>
            <h1 className="top-text">
              <i className="fas fa-receipt"></i> Purchase Orders
            </h1>
          </div>
          <h1 className="top-text"><i className="fas fa-user" style={{ marginRight: '8px' }}/>{apiService.getUsername()}</h1>
        </header>
        <div className="content">
          <h6>Purchase Order Details for: <i className="fas fa-receipt" style={{ marginRight: '8px' }}> </i></h6>
          <div className="card m-4 p-4">
            <table>
              <thead>
                <tr style={{ color: "brown" }}>
                  <th>PO Number</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>
                    <i className="fas fa-trash"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p style={{ cursor: "pointer" }}>
                      {purchaseOrder?.poNumber || "Loading..."}
                    </p>
                  </td>
                  <td>{purchaseOrder?.supplier?.name || "Loading..."}</td>
                  <td>{purchaseOrder.date}</td>
                  <td>
                    {purchaseOrder.delivered ? (
                      "Delivered"
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => handleSetToDelivered(purchaseOrder.id)}
                      >
                        Set to Delivered
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="update_button"
                      // onClick={() => togglePurchaseOrderUpdateModal(item)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete_button mr-3"
                      onClick={() => deletePurchaseOrder(purchaseOrder.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card m-4 p-4">
            <div className="width-max-content mb-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddMaterialModal(true)}
              >
                Add Raw Material
              </button>
            </div>
            <table className="table table">
              <thead className="thead-dark">
                <tr style={{ color: "brown" }}>
                  <th>Raw Material</th>
                  <th>Price</th>
                  <th>Quantity Purchased</th>
                  <th>Quantity in Store</th>
                </tr>
              </thead>
              <tbody>
              {rawMaterials.map((material, index) => (
                  <tr>
                    <td>{material.rawMaterial.name}</td>
                    <td>{material.price}</td>
                    <td>{material.quantity}</td>
                    <td>{material.rawMaterial.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddRawMaterialModal
        isOpen={showAddMaterialModal}
        onClose={() => setShowAddMaterialModal(false)} 
        poID={poID}
      />
    </div>
  );
};

export default PurchaseOrderDetails;
