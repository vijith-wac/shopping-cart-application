import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { setCartItemsCount } from "../redux/createSlice";
import axios from "axios";

const logoutHandler=()=>{
  localStorage.removeItem('authToken')
  window.location.href = '/'
}

const Header = () => {
  const token = localStorage.getItem('authToken')
  const dispatch = useDispatch()
  const cartItemsCount = useSelector(state => state.cart.cartItemsCount);
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

  const logoutHandler=()=>{
    localStorage.removeItem('authToken')
    window.location.href = '/'
  }
  useEffect(()=>{
    getCartItemsCount()
  },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/products">
          Shopping Cart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />

                <span className="badge bg-danger ms-1">{cartItemsCount}</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={logoutHandler}>
              Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;