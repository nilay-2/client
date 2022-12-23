import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URL = "https://mernauthentication.vercel.app";
const ResetPassword = (props) => {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const { token } = useParams();
  const getData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearInput = () => {
    setData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
  };
  const formHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    if (Object.values(data).some((val) => val === "")) {
      toast.error("All fields are required");
      return;
    }
    const res = await fetch(`${BACKEND_URL}/users/resetPassword/${token}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
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
    toast.success(`${d.message}`);
    clearInput();
    return;
  };
  return (
    <div>
      <ToastContainer />
      <div style={{ padding: "2em" }}>
        <Link to={"/login"}>Login</Link> / <Link to={"/signUp"}>Sign up</Link> /{" "}
        <Link to={"/forgotPassword"}>Forgot Passord</Link>
      </div>
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">RESET PASSWORD</h3>
          <form>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="password"
              onChange={getData}
              value={data.password}
            />
            <input
              className="input"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              onChange={getData}
              value={data.confirmPassword}
            />
            <button className="btn" onClick={formHandler}>
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
