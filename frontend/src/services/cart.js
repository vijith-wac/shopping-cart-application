import axios from 'axios';
import { API_URL } from '../constant/api';


const token = localStorage.getItem('authToken')

export const getAllCart = async()=>{
  try{
    const response = await axios.get(`${API_URL}/user/cart`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }) 
    return response.data
  }catch(error){
    console.log(error)
  }
}

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

export const clearCart = async()=>{
  try{
    const response = await axios.delete(`${API_URL}/cart`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    })
    return response
  }catch(error){
    console.log(error)
  }
}
