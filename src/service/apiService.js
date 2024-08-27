import axios from 'axios';
import UpdateCustomerModal from '../components/updatecustomerModal';

const API_URL = 'http://192.168.254.100:8080'; // Adjust the URL based on your backend
const token = localStorage.getItem('token');
if (!token) {
    console.log('No token found');
}

// const config = {
//     headers: {
//         'Bearer': token,
//         'Content-Type': 'application/json', 
//     },
// };
const apiService = {
    getProductRawMaterials: (product) => {
        console.log("id: "+product)
       return  axios.get(`${API_URL}/rawmaterialproportion/getbyproduct/${product}`);
       
    },
    getAllUsers: () => axios.get(`${API_URL}/users`),
    getUserById: (id) => axios.get(`${API_URL}/users/${id}`),
    createUser: (user) => axios.post(`${API_URL}/users/create`, user),
    deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
    verifyOtp: (user) => axios.post(`${API_URL}/users/otpverification`, user),
    login: (user) => axios.post(`${API_URL}/users/login`, user),
    checktoken: (token) => axios.post(`${API_URL}/users/checktoken`, token),
    createcategory: (category) => axios.post(`${API_URL}/categories/create`, category),
    createProduct: (product) => axios.post(`${API_URL}/products/create`,product),
    deleteProduct:(id) => axios.delete(`${API_URL}/products/${id}`),
    getRawMaterials:() => axios.get(`${API_URL}/rawmaterials/all`),
    createRawMaterials:(rawMaterial) => axios.post(`${API_URL}/rawmaterials/create`,rawMaterial),
    deleterawmaterials:(id) => axios.delete(`${API_URL}/rawmaterials/${id}`),
    getProducts: () => axios.get(`${API_URL}/products/all`),
    getcategories: () => axios.get(`${API_URL}/categories/all`),
    getPurchaseOrders: () => axios.get(`${API_URL}/purchaseorders/all`),
    getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
    updateRawMaterialStock: (body) => axios.post(`${API_URL}/rawmaterials/updatestock`,body),
    updateProduct: (body) => axios.post(`${API_URL}/products/edit`,body),
    createRawMaterialProportion: (body) => axios.post(`${API_URL}/rawmaterialproportion/create`,body),
    deleteRawMaterialProportion: (id) => axios.delete(`${API_URL}/rawmaterialproportion/${id}`),
    createProduction: (body) => axios.post(`${API_URL}/production/create`,body),
    getAllPurchaseOrders: () => axios.get(`${API_URL}/purchaseorder/all`),
    completePurchaseOrder: (body) => axios.post(`${API_URL}/purchaseorder/update`,body),
    createCustomer: (body) => axios.post(`${API_URL}/customer/create`,body),
    getAllCustomers: () => axios.get(`${API_URL}/customer/all`),
    updateCustomer: (body) => axios.post(`${API_URL}/customer/update`,body),
   // deletecustomer:(id) => axios.delete(`${API_URL}/custmers/${id}`),
    UpdateCustomerModal: (body) => axios.post(`${API_URL}/customers/updatecustomer`,body),
    createSupplier: (body) => axios.post(`${API_URL}/suppliers/create`,body),
    getAllSupplier: () => axios.get(`${API_URL}/suppliers/all`),
    createPurchaseorder: (body) => axios.post(`${API_URL}/purchaseorder/create`,body),
    getAllPurchaseOrders: () => axios.get(`${API_URL}/purchaseorder/all`),
    setToDelivered: (body) => axios.post(`${API_URL}/purchaseorder/update`,body),
    deletePurchaseOrder:(id) => axios.delete(`${API_URL}/purchaseorder/${id}`),
    getAllUsers: () => axios.get(`${API_URL}/users/all`),
    updateUserStatus: (id) => axios.put(`${API_URL}/users/${id}`),
    deleteUser:(id) => axios.delete(`${API_URL}/users/${id}`),
    getPurchaseOrderById: (id) => axios.get(`${API_URL}/purchaseorder/${id}`),
    getRawMaterialOrdersByPo: (id) => axios.get(`${API_URL}/rawmaterialorder/getbypurchaseorder/${id}`),
    createRawMaterialOrder:(body) => axios.post(`${API_URL}/rawmaterialorder/create`,body),
    getProductions: () => axios.get(`${API_URL}/productions/all`),
    
    

}

export default apiService;
