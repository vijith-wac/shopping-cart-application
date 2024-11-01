import { useEffect, useState } from "react";
import Header from "../components/Header";
import { clearCart, getAllCart } from "../services/cart";
import { createOrder } from "../services/order";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { clearCartAll, setCartItemsCount } from "../redux/createSlice";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address,setAddress] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getAllCartItems = async () => {
    try {
      const res = await getAllCart();
      setCartItems(res);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler=async()=>{

    const payload = {
        products: cartItems.items.map((item) => ({
          productID: item.productID._id,
          quantity: item.quantity,
        })),
        address,
      };
    try{
        const res = await createOrder(payload)
        if(res){
          Swal.fire({
            title: "Order Placed!",
            text: "Your product will be delivered to the provided address.",
            icon: "success"
          }).then(()=>{
            navigate('/products')
          })

          await clearCart()
        dispatch(clearCartAll()) 
        }
        

    }catch(error){
        console.log(error,'erro')
    }
  }

  useEffect(() => {
    getAllCartItems();
  }, []);

  return (
    <div className="contianer">
      <Header />
      <div class="container">
        <div class="row mt-5 align-items-center">
          <div class="col-md-4 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
              <span class="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul class="list-group mb-3">
              {cartItems?.items?.map((item) => {
                const { quantity, totalPrice } = item;
                const { name, price, description } = item?.productID;
                return (
                  <li class="list-group-item d-flex justify-content-between">
                    <div className="w-50">
                      <h6 class="my-0">{name}</h6>
                      <small class="text-muted">{description}</small>
                    </div>
                    <div>
                      <span class="text-muted">
                        {price}X{quantity}
                      </span>
                    </div>
                    <span class="text-muted">₹{totalPrice}</span>
                  </li>
                );
              })}

              <li class="list-group-item d-flex justify-content-between">
                <span>Total (IND)</span>
                <strong>{cartItems?.totalAmount} ₹</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 text-end">
            <div class="mb-3">
              <textarea
                class="form-control"
                onChange={(e)=>setAddress(e.target.value)}
                rows="3"
                placeholder="Address"
              ></textarea>
            </div>
            <button onClick={submitHandler} type="submit" className="btn btn-primary ms-auto w-50 d-block">Submit</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
