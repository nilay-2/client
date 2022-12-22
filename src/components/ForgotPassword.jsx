import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BACKEND_URL from "../../config";
const ForgotPassword = (props) => {
  const [data, setData] = useState({ email: "" });
  const getData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearInput = (e) => {
    setData((prev) => ({ ...prev, email: "" }));
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (data.email === "") {
      toast.error("Please enter email");
      return;
    }
    const myPromise = new Promise(async function (resolve, reject) {
      const res = await fetch(`${BACKEND_URL}/users/forgotPassword`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const d = await res.json();
      if (d.status !== "success") {
        reject(d.message);
      } else {
        resolve(d.message);
      }
    });
    clearInput();
    toast.promise(myPromise, {
      pending: "Email is sent.",
      success: "Please check your mail.",
      error: "Error occured while sending email, please try again later.",
    });
    // const res = await fetch("${BACKEND_URL}/users/forgotPassword", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const d = await res.json();
    // if (d.status !== "success") {
    //   toast.error(`${d.message}`);
    //   clearInput();
    //   return;
    // }
    // toast.success(`${d.message}`);
    // clearInput();
    // return;
  };
  return (
    <div>
      <ToastContainer />
      <div style={{ padding: "2em" }}>
        <Link to={"/login"}>Login</Link> / <Link to={"/signUp"}>Sign up</Link>
      </div>
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">FORGOT PASSWORD</h3>
          <p>
            Sending password reset link might take some time, please be patient.
          </p>
          <form onSubmit={formHandler}>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={getData}
            />
            <button className="btn">Get link</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
