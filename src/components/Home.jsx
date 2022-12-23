import "../css/Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = "https://mernauthentication.vercel.app";

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
      const res = await fetch(`${BACKEND_URL}/getClientDetails`, {
        method: "get",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
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
    const fetchUsers = async () => {
      const res = await fetch(`${BACKEND_URL}/getUsers?username=${query}`, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const d = await res.json();
      if (d.status !== "success") {
        toast.info("No matches found!");
      } else {
        setUsers(d.data.users);
      }
    };
    if (query !== "") {
      fetchUsers();
    }
  }, [query]);
  // const token = localStorage.getItem("token");
  const logout = async () => {
    // if (token) localStorage.removeItem("token");
    const res = await fetch(`${BACKEND_URL}/users/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const d = await res.json();
    if (d.status !== "success") {
      toast.error(`${d.message}`, {
        position: "top-center",
      });
    }
    toast.success("Logged out successfully!", {
      position: "top-center",
    });
    // setTimeout(() => {
    //   window.location.assign("/login");
    // }, 1500);
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
              {/*<Link to={"/login"}>
                <button onClick={logout}>Log out</button>
    </Link>*/}
              <button onClick={logout}>Log out</button>
            </div>
          </div>
        </div>
        <img
          src={`${BACKEND_URL}/img/users/istockphoto-1309328823-170667a.jpg`}
          alt="user-photo"
        />
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
          {query !== "" ? (
            <div className="auto-correct-parent-container">
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
          ) : (
            ""
          )}
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
