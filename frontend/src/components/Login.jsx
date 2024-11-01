import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [userData,setUserData] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await login(userData.email, userData.password); 
          localStorage.setItem('authToken', res.token);
          navigate(res.redirect)
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
          <input type="text" id="email" className="form-control" placeholder="Email" onChange={(e)=>setUserData({...userData, email:e.target.value})} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} required />
        </div>

        <input type="submit" className="btn btn-primary"/>
      </form>
    </div>
  );
};

export default Login;
