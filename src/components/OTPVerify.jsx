import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URL = "https://server-rho-seven.vercel.app";

const OTPVerify = (props) => {
  const [data, setData] = useState({ otp: "" });
  const navigate = useNavigate();
  const getInputData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (data.otp === "") {
      toast.error("Please enter otp");
      return;
    }
    const res = await fetch(`${BACKEND_URL}/users/verifyOTP`, {
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
    clearInput();
    navigate("/");
  };
  const clearInput = () => {
    setData((prev) => ({ ...prev, otp: "" }));
  };
  const resendOTP = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <ToastContainer />
      <div style={{ padding: "2em" }}></div>
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">FORGOT PASSWORD</h3>

          <form>
            <input
              className="input"
              type="text"
              name="otp"
              value={data.otp}
              placeholder="Enter OTP"
              onChange={getInputData}
              maxLength="5"
            />
            <button className="btn" onClick={formHandler}>
              Verify
            </button>
            <button className="btn" onClick={resendOTP}>
              Resend OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
