import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/applications";

export const getMyApplications = async (userId,search='') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/myApplications/${userId}?search=${search}`);
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
