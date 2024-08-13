import apiService from './apiService';

const RawService = {
  // Asynchronous method to get all raw materials
  getRawMaterials: async () => {
    try {
      // Await the response from apiService.getRawMaterials
      const response = await apiService.getRawMaterials();
      // Return the data from the response
      console.log(response.data.rawmaterials)
      return response.data.rawmaterials;
    } catch (error) {
      // Handle errors (e.g., logging or throwing)
      console.error('Error fetching raw materials:', error);
      throw error; // Rethrow to handle it in the caller function if needed
    }
  },

  // Asynchronous method to get a raw material by ID
  getRawMaterialById: async (id) => {
    try {
      // Await the response from apiService.getRawMaterialById
      const response = await apiService.getRawMaterialById(id);
      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle errors (e.g., logging or throwing)
      console.error(`Error fetching raw material with ID ${id}:`, error);
      throw error; // Rethrow to handle it in the caller function if needed
    }
  },

  // Asynchronous method to create a new raw material
  createRawMaterial: async (rawMaterial) => {
    try {
      // Await the response from apiService.createRawMaterials
      const response = await apiService.createRawMaterials(rawMaterial);
      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle errors (e.g., logging or throwing)
      console.error('Error creating raw material:', error);
      throw error; // Rethrow to handle it in the caller function if needed
    }
  },

  // Asynchronous method to update raw material stock
  updateRawMaterialStock: async (body) => {
    try {
      // Await the response from apiService.updateRawMaterialStock
      const response = await apiService.updateRawMaterialStock(body);
      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle errors (e.g., logging or throwing)
      console.error('Error updating raw material stock:', error);
      throw error; // Rethrow to handle it in the caller function if needed
    }
  },

  // Asynchronous method to delete a raw material
  deleteRawMaterial: async (id) => {
    try {
      // Await the response from apiService.deleteRawMaterials
      const response = await apiService.deleteRawMaterials(id);
      // Return the data from the response (e.g., success confirmation)
      return response.data;
    } catch (error) {
      // Handle errors (e.g., logging or throwing)
      console.error(`Error deleting raw material with ID ${id}:`, error);
      throw error; // Rethrow to handle it in the caller function if needed
    }
  }
};

export default RawService;
