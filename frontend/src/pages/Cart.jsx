import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { setCartItemsCount } from "../redux/createSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeProductFromCart } from "../services/cart";

const Cart = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response?.data?.items);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1

    try {
      // Send a request to update the quantity in the backend
      const response = await axios.put(
        `http://localhost:8000/api/cart`,
        {
          productID: item?.productID?._id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
      
      // dispatch(setCartItemsCount(response?.data?.items?.length));
      fetchCartProducts()
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteHandler=async(productID,token)=>{
    try{
      await removeProductFromCart(productID,token)
      fetchCartProducts()
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="container mt-5">
      <Header />
      <h2>Shopping Cart</h2>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems?.map((item) => (
              <div key={item?.productID?._id}>
                <li
                  
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item?.productID?.image}
                      alt={item?.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <span>{item?.productID?.name} - </span>
                    <input
                      type="number"
                      min="1"
                      value={item?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, Number(e.target.value))
                      }
                      style={{
                        width: "60px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <span>x ${item?.productID?.price}</span>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={()=>deleteHandler(item?.productID?._id, token)}
                  >
                    Remove
                  </button>

                  <p>Total Quantity: {item?.quantity}</p>
                  <p>Total Price: {item?.totalPrice.toFixed(2)}</p>
                  <Link to="/checkout" className="btn btn-success">
                    Proceed to Checkout
                  </Link>
                </li>
                
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
