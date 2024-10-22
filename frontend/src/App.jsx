// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";



const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<LoginRegister />} />
        </Routes>
    </Router>
  );
};

export default App;