import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { addItemToCart } from "../services/cart";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/createSlice";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:8000/api/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductList(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const addToCart = async(id)=>{
    const token = localStorage.getItem('authToken')
    let quantity=1
    try{
      const data = await addItemToCart(token,id,quantity)
      toast.success(data?.message)
      dispatch(addItem({productID: id, quantity}))
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="container">
      <Header />
      <div className="mt-5 row">
        <h2>Product List</h2>

        {productList?.map((item) => {
          const { name, image, price, description } = item;
          return (
            <div className="col-4">
              <div className="card p-3" style={{ width: "18rem" }}>
                <img src={image} style={{maxHeight:'200px'}} className="card-img-top img-fluid" />
                <h5>{name}</h5>
                <div className="card-body">
                  <p className="card-text">
                    {description}
                  </p>
                </div>
                <h6>{price}</h6>
      
                <div>
                  <button className="btn btn-primary" onClick={()=>addToCart(item?._id)}>Add to Cart</button>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
