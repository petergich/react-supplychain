import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../service/apiService"; // Adjust the path as necessary
import Aside from "../components/Aside";
import AddRawMaterialModal from "../components/AddRawMaterialModal"; // Adjust the path as necessary

const ProductsOrderDetails = () => {
  const navigate = useNavigate();
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [rawMaterials, setRawMaterials] = useState([]);
  const [isNavVisible, setNavVisible] = useState(true);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  const handleAddMaterial = (material) => {
    // Update the rawMaterials state with the new material
    setRawMaterials([...rawMaterials, material]);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const poId = urlParams.get("po");
    
    const fetchPurchaseOrder = async (poId) => {
      const response = await apiService.getPurchaseOrderById(poId);
      setPurchaseOrder(response.data);
    };

    const fetchRawMaterials = async () => {
      const response = await apiService.getRawMaterials();
      setRawMaterials(response.data);
    };

    fetchPurchaseOrder(poId);
    fetchRawMaterials();
  }, []);

  const deletePurchaseOrder = (id) => {
    apiService
      .deletePurchaseOrder(id)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  };

  const handleSetToDelivered = async (id) => {
    try {
      await apiService.setToDelivered({ id: id, delivered: true });
      window.location.reload();
    } catch (error) {
      alert(`Error updating purchase order to delivered: ${error.message}`);
    }
  };

  const selectProduct = (id) => {
    navigate(`/purchaseorderdetails?po=${encodeURIComponent(id)}`);
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
          <h1 className="top-text">Username</h1>
        </header>
        <div className="content">
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
                    <p
                      onClick={() => selectProduct(purchaseOrder.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {purchaseOrder?.poNumber || "Loading.."}
                    </p>
                  </td>
                  <td>{purchaseOrder?.supplier?.name || "Loading.."}</td>
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
                      //onClick={() => togglePurchaseOrderUpdateModal(item)}
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
            <table className="table table-responsive">
              <thead className="thead-dark">
                <tr style={{ color: "brown" }}>
                  <th>Raw Material</th>
                  <th>Price</th>
                  <th>Quantity Purchased</th>
                  <th>Quantity in Store</th>
                </tr>
              </thead>
              <tbody>
                {/* {rawMaterials.map((material, index) => (
                  <tr key={index}>
                    <td>{material.name}</td>
                    <td>{material.price}</td>
                    <td>{material.quantityPurchased}</td>
                    <td>{material.quantityInStore}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddRawMaterialModal
        isOpen={showAddMaterialModal}
        onClose={() => setShowAddMaterialModal(false)}
        rawMaterials={rawMaterials}
        onSave={handleAddMaterial}
      />
    </div>
  );
};

export default ProductsOrderDetails;
