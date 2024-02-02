import Axios from "axios";
let API_URL = "http://localhost:8080/api/vehiculos";

const save = async (payload) => {
  try {
    const response = await Axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  save,
};
