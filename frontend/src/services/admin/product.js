import axios from "axios";
import { API_URL } from "../../constant/api";
export const listAllProduct = async(token)=>{
    try{
        const response = await axios.get(`${API_URL}/product`,{
            headers: {
                Authorization: `Bearer ${token}`, 
              },
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const updateProductById = async(token,_id,formData)=>{
    try{
        const response = await axios.put(`${API_URL}/product/${_id}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`, 
              },
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}
