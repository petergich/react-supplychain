import apiService from "./apiService";


const RawMaterialProportionService = {
createRawMaterialProportion: async (body) =>{
    try{
        const response = await apiService.createRawMaterialProportion(body)
        console.log(response.data)
        return response.data
        
    }catch(error){
        alert(error)
    }
},
deleteRawMaterialProportion: async (id) =>{
try{
const response = await apiService.deleteRawMaterialProportion(id)
return response
}
catch(error){
    alert(error)
}
}

}
export default RawMaterialProportionService