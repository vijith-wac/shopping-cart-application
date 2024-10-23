import axios from "axios";
import { useEffect, useState } from "react"
import Header from "../components/Header";

const ProductList = ()=>{
    const [productList,setProductList] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
          const token = localStorage.getItem('authToken'); 
          try {
            const response = await axios.get('http://localhost:8000/api/product', {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            });
            setProductList(response.data.products); 
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts(); 
      }, []);
    return(
        <div>
            <Header/>
            <h2>Product List</h2>
        </div>
    )
}

export default ProductList