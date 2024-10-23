  import axios from "axios";
  import { useEffect, useState } from "react";
  import Header from "../components/Header";
  import { addItemToCart } from "../services/cart";
  import toast from "react-hot-toast";
  import { useDispatch } from "react-redux";
  import { setCartItemsCount } from "../redux/createSlice";

  const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("authToken");
  
    useEffect(() => {
      const fetchProducts = async () => {
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
      getCartItemsCount();
    }, []);
  
    const getCartItemsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCartItemsCount(response?.data?.items?.length));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    const addToCart = async (id) => {
      let quantity = 1;
      try {
        const data = await addItemToCart(token, id, quantity);
        toast.success(data?.message);
  
        // Fetch updated cart items count after adding item to cart
        const response = await axios.get("http://localhost:8000/api/user/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Update cart items count in Redux
        dispatch(setCartItemsCount(response?.data?.items?.length));
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="container">
        <Header />
        <div className="mt-5 row">
          <h2>Product List</h2>
  
          {productList?.map((item) => {
            const { name, image, price, description } = item;
            return (
              <div className="col-4" key={item?._id}>
                <div className="card p-3" style={{ width: "18rem" }}>
                  <img src={image} style={{ maxHeight: '200px' }} className="card-img-top img-fluid" />
                  <h5>{name}</h5>
                  <div className="card-body">
                    <p className="card-text">
                      {description}
                    </p>
                  </div>
                  <h6>{price}</h6>
                  <div>
                    <button className="btn btn-primary" onClick={() => addToCart(item?._id)}>Add to Cart</button>
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
