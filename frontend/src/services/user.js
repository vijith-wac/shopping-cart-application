import axios from "axios";
import { API_URL } from "../constant/api";

const token = localStorage.getItem('authToken')
export const  allUser = async()=>{
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