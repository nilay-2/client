import "../css/Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const Home = ({ clData }) => {
const Home = (props) => {
  const [status, setStatus] = useState(false);
  const [clientData, setClientData] = useState({});
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const clearUsers = () => {
    setUsers([]);
  };
  const getQuery = (e) => {
    clearUsers();
    setQuery(e.target.value);
  };
  const clearInput = () => {
    clearUsers();
    setQuery("");
  };
  const formHandler = (e) => {
    e.preventDefault();

    clearInput();
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/getClientDetails", {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
      });
      const d = await res.json();
      if (d.status !== "success") {
        setStatus(false);
        toast.info(`${d.message}`);
        navigate("/login");
        return;
      }
      setStatus(true);
      const { data } = d;
      const { user } = data;
      setClientData((prev) => ({ ...prev, ...user }));
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (query.length >= 1) {
      const fetchUsers = async () => {
        const res = await fetch(
          `http://localhost:5000/getUsers?username=${query}`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const d = await res.json();
        if (d.status !== "success") {
          toast.info("No matches found!");
        } else {
          setUsers((prev) => [...prev, ...d.data.users]);
        }
      };
      fetchUsers();
    }
  }, [query]);
  // const token = localStorage.getItem("token");
  const logout = async () => {
    // if (token) localStorage.removeItem("token");
    const res = await fetch("http://localhost:5000/users/logout", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return;
  };
  if (status) {
    return (
      <div className="component-container">
        <ToastContainer />
        <div className="header">
          <div className="header-links">
            <div className="nav-link">
              <Link to={"/account"}>Account</Link>
            </div>
            <div className="nav-link">
              <Link to={"/signUp"}>
                <button>Sign up</button>
              </Link>
            </div>
            <div className="nav-link">
              <Link to={"/login"}>
                <button onClick={logout}>Log out</button>
              </Link>
            </div>
          </div>
        </div>
        <h3>{JSON.stringify(clientData)}</h3>
        <div className="formAndSuggestion">
          <div className="searchContainer">
            <form onSubmit={formHandler}>
              <input
                type="text"
                className="searchBar"
                value={query}
                placeholder="Search"
                onChange={getQuery}
              />
            </form>
            <span className="close-btn" onClick={clearInput}>
              x
            </span>
          </div>
          <div className="auto-correct-container">
            {users.map((user, i) => {
              return (
                <div id="profile" key={i}>
                  <div className="pic">
                    <div className="profile-pic"></div>
                  </div>
                  <div className="name">
                    <h5 className="username">{user.username}</h5>
                    <span className="email">{user.email}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
};

export default Home;
