import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import ProductList from "./pages/ProductList";
import ProtectedRoute from "./middleware/protectedRoute";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Dashboard from "./pages/admin/Dashboard";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminOrdersList from "./pages/admin/AdminOrdersList";
import UsersListPage from "./pages/admin/UsersListPage";



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
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/product" element={<AdminProduct/>}/>
          <Route path="/admin/order" element={<AdminOrdersList/>}/>
          <Route path="/admin/users" element={<UsersListPage/>} />
        </Routes>
    </Router>
  );
};

export default App;