// ham call api chung
import API_CONFIG from "../../config/ApiConfig";

const BASE_URL = API_CONFIG.API_BASE_URL;

// endpoint la router, options bao gom method, header, body
export const fetchData = async (endpoint, options = {}) => {
  try {
    console.log(`${BASE_URL}/${endpoint}`);
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    // tach json tu response
    return await response.json();
  } catch (error) {
    console.error('API error:', error, "(base fetch function)");
    throw error; // throw to the nearest catch block
  }
};