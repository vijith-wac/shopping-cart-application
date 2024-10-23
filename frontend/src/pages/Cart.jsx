import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios";
import { setCartItemsCount } from "../redux/createSlice";
import { useDispatch } from "react-redux";

const Cart = ()=>{
    const token = localStorage.getItem("authToken");
    const dispatch = useDispatch();
    const[cartItems,setCartItems] = useState([])
    useEffect(() => {
        const fetchCartProducts = async () => {
          try {
            const response = await axios.get("http://localhost:8000/api/user/cart", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCartItems(response?.data?.items);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchCartProducts();
      }, []);
      console.log(cartItems,'cart')

      const handleQuantityChange = async (item, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity less than 1
    
        try {
          // Send a request to update the quantity in the backend
          const response = await axios.put(
            `http://localhost:8000/api/cart`, 
            { 
              productID:item?.productID?._id,
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
    
          dispatch(setCartItemsCount(response?.data?.items?.length));
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      };
    


    return(
     
        <div className="container mt-5">
             <Header/>
        <h2>Shopping Cart</h2>
        {cartItems?.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul className="list-group">
              {cartItems?.map((item) => (
                <li key={item?.productID?._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img 
                      src={item?.productID?.image    } 
                      alt={item?.name}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <span>{item?.productID?.name} - </span>
                    <input 
                      type="number"
                      min="1"
                      value={item?.quantity}
                      onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                      style={{ width: '60px', marginLeft: '10px', marginRight: '10px' }}
                    />
                    <span>x ${item?.productID?.price}</span>
                  </div>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => dispatch(removeItemFromCart(item.id))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {/* <div className="mt-3">
              <h5>Total Quantity: {item?.quantity}</h5>
              <h5>Total Price: ${item?.totalPrice.toFixed(2)}</h5> 
              <Link to="/checkout" className="btn btn-success">
                Proceed to Checkout
              </Link>
            </div> */}
          </div>
        )}
      </div>
    )
    
}

export default Cart