import axios from 'axios';
import { API_URL } from '../constant/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.token; 
  } catch (error) {
    throw error.response?.data || new Error('Login failed');
  }
};


export const register = async(name,email,password)=>{
  try{
    const response = await axios.post(`${API_URL}/register`,{
      name,email,password
    })
    return response.data
  }catch(error){
    throw error.response?.data || new Error('Login failed');
  }
}