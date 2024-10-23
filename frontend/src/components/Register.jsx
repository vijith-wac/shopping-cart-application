import { useState } from "react";
import { register } from "../services/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [userInfo ,setUserInfo] = useState({
    name:'',
    email:'',
    password:''
  })



  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await register(userInfo.name, userInfo.email, userInfo.password)
      toast.success('Registration successful')
      setUserInfo({
        name:'',
        email:'',
        password:''
      })
    } catch (err) {
      toast.error(err.message)
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name"
            value={userInfo.name}
            required
            onChange={(e)=>setUserInfo({...userInfo, name:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={userInfo.email}
            placeholder="Email"
            required
            onChange={(e)=>setUserInfo({...userInfo, email:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={userInfo.password}
            placeholder="Password"
            required
            onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})}
          />
        </div>
        <input type="submit" className="btn btn-success"/>
      </form>
    </div>
  );
};

export default Register;
