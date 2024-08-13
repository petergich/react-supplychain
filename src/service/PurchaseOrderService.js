import apiService from "./apiService";

const PurchaseOrderService = {
getAllPurchaseOrders:async () =>{
    try{
      const response = await apiService.getAllPurchaseOrders();
      console.log(response.data)
      return response.data;
    } catch(error){
        console.log(error)
    }
      
}

}
export default PurchaseOrderService;