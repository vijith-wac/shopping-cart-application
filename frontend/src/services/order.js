import axios from "axios";
import { API_URL } from "../constant/api";
import toast from "react-hot-toast";

const token = localStorage.getItem('authToken');

export const createOrder = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/order`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    });
    return response;
  } catch (error) {
    console.log(error?.response?.data?.message,'er')
    toast.error(error?.response?.data?.message)
  }
};