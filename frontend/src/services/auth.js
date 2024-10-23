import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
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