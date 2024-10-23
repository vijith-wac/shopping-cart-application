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
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data; 
  } catch (error) {
    throw error.response?.data || new Error('Adding item to cart failed');
  }
};

export const removeProductFromCart = async(productID,token)=>{
  try{
    const response= await axios.post(`${API_URL}/cart/remove`,{
      productID
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    })
    return response.data
  }catch(error){
    throw error.response?.data || new Error('Adding item to cart failed');
  }
}