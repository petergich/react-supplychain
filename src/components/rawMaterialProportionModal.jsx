import React, { useEffect, useState } from "react"
import RawMaterialService from '../service/RawMaterialService'
import "../styles/home.css"
import RawMaterialProportionService from "../service/RawMaterialProportionService";
const RawMaterialProportionModal = ({isVisible,onClose,item}) =>{
    const [rawMaterials, setRawMaterials] = useState([]);
    const [selectedRawMaterial,setSelectedRawMaterial] = useState([])
    const [proportion, setProportion] = useState(null)


    const getRawMaterials = async () =>{
        try{
        const objects = await RawMaterialService.getRawMaterials()
        setRawMaterials(objects)
        }catch(error){
            alert(error)
        }
    };
    useEffect( () =>{
        
        getRawMaterials()

    },[])
    
    const handleSave = (e) =>{
        e.preventDefault();
        console.log({"propotion":proportion,"productId":item,"rawMaterialId":selectedRawMaterial})
        RawMaterialProportionService.createRawMaterialProportion({"propotion":proportion,"productId":item,"rawMaterialId":selectedRawMaterial})
        window.location.reload()
    }
    
    if(!isVisible){
        return null
    }
    return(
        <div className="modal-overlay">
        <div className="modalProduct">
            <form onSubmit={handleSave}>
            <h2 style ={{color:"blue"}}className="text-align-center mb-3">
                Add New Raw Material to the product
            </h2>
            <div class="form-group">
                <label for="exampleInputEmail1">Proportion</label>
                <input required type="number"  className="form-control"onChange={(e) =>setProportion(e.target.value)}placeholder="Enter quantity.."/>
                <small style ={{color:"blue"}}className="form-text text-muted">Quantity used to produce one unit of a product</small>
            </div>
            <div className="form-group">
            <label className="mr-sm-2" for="inlineFormCustomSelect">Select a Raw material</label>
            <select required className="custom-select mr-sm-2" onChange={(e) =>setSelectedRawMaterial(e.target.value)}>
                <option disabled selected>Choose...</option>
                {rawMaterials.map((rawMaterial,index) => 
                <option key={index}value = {rawMaterial.id}>{rawMaterial.name}</option>
                )}
                
            </select>
            </div>
            <div className="d-flex">
            <button type="button" className="btn btn-secondary m-3" onClick={onClose}>Close</button>
            <button type="submit" className="btn btn-primary m-3">add</button>
            </div>
            </form>
        </div>
        </div>

    )
}
export default RawMaterialProportionModal