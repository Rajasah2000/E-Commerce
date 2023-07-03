import React, { useState } from "react";
import HttpClient from "../components/HttpClient";
import "../pages/Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: userEmail,
      password: password,
    };
    let result = await HttpClient.requestData("login", "POST", data);
    console.log("UserData", result);
    // if(userEmail && password){
    if (result && result.status) {
      let auth = {
        loginStatus: true,
        token: result.data.token,
      };

      setEmailError("");
      setPassError("");
      toast.success(result.message);
      reactLocalStorage.setObject("adminData", auth);
      setUserEmail("");
      setPassword("");
      navigate("/ecommerce");
    } else {
      setEmailError(result?.error?.email?.message);
      setPassError(result?.error?.password?.message);
      //    {result?.message ? toast.error(result.message): null}
      console.log("LOG", result);
      toast.error(result.message || "All fields required");
    }
    // }else{
    //     toast.error("All Fields Are Required")
    // }
    // console.log("UserData", data);
  };

  return (
    <div className="container fade-in">
      <div class="form-container" id="login-form">
        <h1 style={{color : 'rgb(3, 201, 215)'}}>Login Credentials</h1>
        <form className="loginForm">
          <label for="username"  style={{fontWeight: '600'}}>Username</label>
          <input
           className={`${emailError ? "error-input" : ""}`}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your email..."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {emailError && <p className="error-login fade-in">{emailError}</p>}
          <label for="password" style={{fontWeight: '600'}}>Password</label>
          <input
            className={`${passError ? "error-input" : ""}`}
            type="password"
            id="password"
            placeholder="Enter your password..."
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passError && <p className="error-login fade-in">{passError}</p>}
          <button onClick={onsubmit} className="btn-login">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// {
  /* <div class="login-page">
    <div class="login-box">
        <h2 class="heading-login-box">Login</h2>
        <form>
            <div class="user-box">
                <input class="user-box-input" type="text" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                <label class="user-box-label">User email</label>
                {emailError && <p style={{ color: "red" , paddingBottom:'12px'}}>{emailError}</p>}
            </div>
             
            <div class="user-box">
                <input class="user-box-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label class="user-box-label">Password</label>
                {passError && <p style={{ color: "red" }}>{passError}</p>}
            </div>
            <button onClick={onsubmit} class="login-box-button" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </button>
        </form>
    </div>
</div> */
// }
