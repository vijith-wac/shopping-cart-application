import { useState } from "react";
import { login } from "../services/auth";

const Login = () => {

    const [userData,setUserData] = useState({
        email:'',
        password:''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const token = await login(userData.email, userData.password); 
          localStorage.setItem('authToken', token);
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label for="email" class="form-label">Email</label>
          <input type="text" id="email" className="form-control" placeholder="Email" onChange={(e)=>setUserData({...userData, email:e.target.value})} />
        </div>
        <div className="mb-3">
        <label for="password" class="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} />
        </div>

        <input type="submit" className="btn btn-primary"/>
      </form>
    </div>
  );
};

export default Login;
