import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import ProductList from "./pages/ProductList";
import ProtectedRoute from "./middleware/protectedRoute";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";



const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
            path="/products"
            element={
                <ProtectedRoute>
                   <ProductList />
                </ProtectedRoute>  
            }
          />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
        </Routes>
    </Router>
  );
};

export default App;