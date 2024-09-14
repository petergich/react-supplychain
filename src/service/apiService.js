import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://192.168.254.132:8080'; // Adjust the URL based on your backend
const token = localStorage.getItem('token');
if (!token) {
    console.log('No token found');
}

const config = {
    headers: {
        'Bearer': token,
        'Content-Type': 'application/json', 
    },
};
const apiService = {
    getUsername:() => {
        try {
          // Decode the JWT token
          const decodedToken = jwtDecode(token);
      
          console.log(decodedToken)
          const username = decodedToken.sub; // 'sub' is often used for the subject in tokens
      
          return username;
        } catch (error) {
          console.error("Error decoding JWT:", error);
          return "Username";
        }
      },
    getProductRawMaterials: (product) => {
        console.log("id: "+product)
       return  axios.get(`${API_URL}/rawmaterialproportion/getbyproduct/${product}`);
       
    },
    getAllUsers: () => axios.get(`${API_URL}/users/all`,config),
    getUserById: (id) => axios.get(`${API_URL}/users/${id}`,config),
    createUser: (user) => axios.post(`${API_URL}/users/create`, user),
    deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
    verifyOtp: (user) => axios.post(`${API_URL}/users/otpverification`, user),
    login: (user) => axios.post(`${API_URL}/users/login`, user),
    checktoken: (token) => axios.post(`${API_URL}/users/checktoken`, token),
    createcategory: (category) => axios.post(`${API_URL}/categories/create`, category,config),
    createProduct: (product) => axios.post(`${API_URL}/products/create`,product,config),
    deleteProduct:(id) => axios.delete(`${API_URL}/products/${id}`,config),
    getRawMaterials:() => axios.get(`${API_URL}/rawmaterials/all`,config),
    createRawMaterials:(rawMaterial) => axios.post(`${API_URL}/rawmaterials/create`,rawMaterial,config),
    deleterawmaterials:(id) => axios.delete(`${API_URL}/rawmaterials/${id}`,config),
    getProducts: () => axios.get(`${API_URL}/products/all`,config),
    getcategories: () => axios.get(`${API_URL}/categories/all`,config),
    getPurchaseOrders: () => axios.get(`${API_URL}/purchaseorders/all`,config),
    getProductById: (id) => axios.get(`${API_URL}/products/${id}`,config),
    updateRawMaterialStock: (body) => axios.post(`${API_URL}/rawmaterials/updatestock`,body,config),
    updateProduct: (body) => axios.post(`${API_URL}/products/edit`,body,config),
    createRawMaterialProportion: (body) => axios.post(`${API_URL}/rawmaterialproportion/create`,body,config),
    deleteRawMaterialProportion: (id) => axios.delete(`${API_URL}/rawmaterialproportion/${id}`,config),
    createProduction: (body) => axios.post(`${API_URL}/production/create`,body,config),
    getAllPurchaseOrders: () => axios.get(`${API_URL}/purchaseorder/all`,config),
    completePurchaseOrder: (body) => axios.post(`${API_URL}/purchaseorder/update`,body,config),
    createCustomer: (body) => axios.post(`${API_URL}/customer/create`,body,config),
    getAllCustomers: () => axios.get(`${API_URL}/customer/all`,config),
    updateCustomer: (body) => axios.post(`${API_URL}/customer/update`,body,config),
   // deletecustomer:(id) => axios.delete(`${API_URL}/custmers/${id}`),
    UpdateCustomerModal: (body) => axios.post(`${API_URL}/customers/updatecustomer`,body,config),
    createSupplier: (body) => axios.post(`${API_URL}/suppliers/create`,body,config),
    getAllSupplier: () => axios.get(`${API_URL}/suppliers/all,config`),
    createPurchaseorder: (body) => axios.post(`${API_URL}/purchaseorder/create`,body,config),
    setToDelivered: (body) => axios.post(`${API_URL}/purchaseorder/update`,body,config),
    deletePurchaseOrder:(id) => axios.delete(`${API_URL}/purchaseorder/${id}`,config),
    updateUserStatus: (id) => axios.put(`${API_URL}/users/${id}`,config),
    getPurchaseOrderById: (id) => axios.get(`${API_URL}/purchaseorder/${id}`,config),
    getRawMaterialOrdersByPo: (id) => axios.get(`${API_URL}/rawmaterialorder/getbypurchaseorder/${id}`,config),
    createRawMaterialOrder:(body) => axios.post(`${API_URL}/rawmaterialorder/create`,body,config),
    ForgotPassword:(email) => axios.post(`${API_URL}/users/forgetpassword`, email),
    confirmResetPassword:(body)=> axios.post(`${API_URL}/users/resetpassword`, body),
    getProductions:() => axios.get(`${API_URL}/production/all,config`),
    deleteSupplier:(id) => axios.delete(`${API_URL}/suppliers/${id}`,config)
    
    

}

export default apiService;
