// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const ProtectedRoute = function ({ Component }) {
//   // const token = localStorage.getItem("token");
//   const [status, setStatus] = useState(false);
//   const [clientData, setClientData] = useState({});
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("http://localhost:5000/getClientDetails", {
//         method: "get",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           // token: token,
//         },
//       });
//       const d = await res.json();
//       if (d.status !== "success") {
//         setStatus(false);
//         toast.error(`${d.message}`);
//         navigate("/login");
//         return;
//       }
//       setStatus(true);
//       const { data } = d;
//       const { user } = data;
//       setClientData((prev) => ({ ...prev, ...user }));
//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       <ToastContainer />
//       <div>{status ? <Component clData={clientData} /> : ""}</div>
//     </div>
//   );
// };

// export default ProtectedRoute;
