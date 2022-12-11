// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OTPVerify from "./components/OTPVerify";
// import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
          {/*<Route path="/" exact element={<ProtectedRoute Component={Home} />} />*/}
          <Route path="/" exact element={<Home />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:token"
            exact
            element={<ResetPassword />}
          />
          <Route path="/verifyOTP" exact element={<OTPVerify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
