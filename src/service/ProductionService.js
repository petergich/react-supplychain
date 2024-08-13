import apiService from "./apiService"


const ProductionService = {
    CreateProduction: async (body) =>{
        try{
        const response = await apiService.createProduction(body)
        return response
        }catch(error){
            alert(error)
        }
        
    }
}
export default ProductionService