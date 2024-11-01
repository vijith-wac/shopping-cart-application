import axios from "axios";
import { API_URL } from "../constant/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
    Swal.fire({
      title:'Error',
      text: error?.response?.data?.message,
      icon:'warning'

    }).then(()=>{
       window.location.href = '/cart'
    })
  }
};