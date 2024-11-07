import axios from "axios";
import { API_URL } from "../constant/api";

export const  allUser = async(token)=>{
    try{
        const response = await axios.get(`${API_URL}/user`,{
            headers: {
                Authorization: `Bearer ${token}`, 
              },
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}