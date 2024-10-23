import axios from 'axios';
import { API_URL } from '../constant/api';

export const addItemToCart = async (token, productID, quantity) => {

  try {
    const response = await axios.post(
      `${API_URL}/cart`, 
      {
        productID,
        quantity,
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the Bearer token in the headers
        },
      }
    );

    return response.data; 
  } catch (error) {
    throw error.response?.data || new Error('Adding item to cart failed');
  }
};
