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
    console.error('Error during login:', error.response?.data || error.message);
    throw error.response?.data || new Error('Login failed');
  }
};
