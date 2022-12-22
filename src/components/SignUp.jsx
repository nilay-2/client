import "../css/Form.css";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URL = "https://mernauthentication.vercel.app/users";
const regex = {
  username: /^[a-zA-Z0-9_-]{3,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const errMsg = {
  username:
    "Username must have atleast 3 characters and it can contain only alphanumeric, underscore or hyphen",
  email: "Enter valid email address",
  password:
    "Password must have atleast one lowercase, uppercase, number and special character",
  confirmPassword: "Password must match",
};
const SignUp = (props) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validateStatus, setValidateStatus] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const getInputData = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearInput = () => {
    setData((prev) => {
      return {
        ...prev,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    });
    inputRef.current.forEach((input) => {
      input.style.border = "2px solid gray";
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    inputRef.current.forEach((input) => {
      input.focus();
      input.blur();
      return;
    });
    if (
      Object.values(validateStatus).every((val) => val === true) &&
      Object.values(data).every((val) => val !== "") &&
      Object.values(err).every((val) => val === "")
    ) {
      const myPromise = new Promise(function (resolve, reject) {
        fetch(`${BACKEND_URL}/users/signUp`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((d) => {
            if (d.status !== "success") {
              reject(d.message);
            } else {
              resolve(d.message);
              navigate("/verifyOTP");
            }
          });
      });
      clearInput();
      toast.promise(myPromise, {
        pending: "Email is sent.",
        success: "Please check your mail.",
        error: "Error occured while sending email, please try again later.",
      });
      // const res = await fetch("http://localhost:5000/users/signUp", {
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
      // alert("OTP is sent to your mail, please check your mail.");
      // clearInput();
      // navigate("/verifyOTP");
      // return;
    }
  };

  const setValidationStatus = (e, status) => {
    setValidateStatus((prev) => ({ ...prev, [e.target.name]: status }));
  };

  const setInputErr = (e, error) => {
    setErr((prev) => {
      return { ...prev, [e.target.name]: `${error}` };
    });
    e.target.style.border = "2px solid black";
  };

  const validInput_UI = (e) => {
    e.target.style.border = "2px solid green";
    setErr((prev) => ({ ...prev, [e.target.name]: "" }));
    setValidationStatus(e, true);
  };

  const validate = (e, pattern) => {
    const val = e.target.value;
    const [inputName] = [e.target.name];
    if (val === "") {
      setInputErr(e, new Error("Field is required").message);
      setValidationStatus(e, false);
    } else if (!val.match(pattern) && inputName === "username") {
      setInputErr(e, new Error(errMsg[`${inputName}`]).message);
      setValidationStatus(e, false);
    } else if (!val.match(pattern) && inputName === "email") {
      setInputErr(e, new Error(errMsg[`${inputName}`]).message);
      setValidationStatus(e, false);
    } else if (!val.match(pattern) && inputName === "password") {
      setInputErr(e, new Error(errMsg[`${inputName}`]).message);
      setValidationStatus(e, false);
    } else {
      validInput_UI(e);
    }
    return;
  };

  const confirmPassValidator = (e) => {
    const [inputName] = [e.target.name];
    if (e.target.value === "") {
      setInputErr(e, new Error("Field is required").message);
      setValidationStatus(e, false);
    } else if (e.target.value !== inputRef.current[2].value) {
      setInputErr(e, new Error(errMsg[`${inputName}`]).message);
      setValidationStatus(e, false);
    } else {
      validInput_UI(e);
    }
    return;
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">SIGN UP</h3>
          <form>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={getInputData}
              value={data.username}
              onBlur={(e) => {
                validate(e, regex[`${e.target.name}`]);
              }}
              ref={(element) => {
                inputRef.current[0] = element;
              }}
            />
            <div className="mssg">
              {err.username ? <p>{err.username}</p> : ""}
            </div>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={getInputData}
              value={data.email}
              onBlur={(e) => {
                validate(e, regex[`${e.target.name}`]);
              }}
              ref={(element) => {
                inputRef.current[1] = element;
              }}
            />
            <div className="mssg">{err.email ? <p>{err.email}</p> : ""}</div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={getInputData}
              value={data.password}
              onBlur={(e) => {
                validate(e, regex[`${e.target.name}`]);
              }}
              ref={(element) => {
                inputRef.current[2] = element;
              }}
            />
            <div className="mssg">
              {err.password ? <p>{err.password}</p> : ""}
            </div>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={getInputData}
              value={data.confirmPassword}
              onBlur={confirmPassValidator}
              ref={(element) => {
                inputRef.current[3] = element;
              }}
            />
            <div className="mssg">
              {err.confirmPassword ? <p>{err.confirmPassword}</p> : ""}
            </div>
            <button className="btn" onClick={formHandler}>
              Sign up
            </button>
            <div className="link">
              Already a user? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
