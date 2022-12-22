import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BACKEND_URL from "../../config";
const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const clearInput = () => {
    setData((prev) => ({ ...prev, email: "", password: "" }));
  };
  const getData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (Object.values(data).some((val) => val === "")) {
      toast.error("All fields are required");
      return;
    }
    const res = await fetch(`${BACKEND_URL}/users/login`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (d.status !== "success") {
      toast.error(`${d.message}`);
      clearInput();
      return;
    }
    alert("Login successful");
    navigate("/");
    console.log(d);
    // localStorage.setItem("token", d.token);
    clearInput();
    return;
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">LOGIN</h3>
          <form>
            <input
              className="input"
              type="text"
              name="email"
              value={data.email}
              placeholder="Email"
              onChange={getData}
            />
            <input
              className="input"
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={getData}
            />
            <button className="btn" onClick={formHandler}>
              Login
            </button>
            <div className="link">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </div>
            <div className="link">
              Need an account? <Link to={"/signUp"}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
