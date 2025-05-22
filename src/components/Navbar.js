import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {

  const [data, setData] = useState("");
  const [token, setToken] = useState(null);

  const getUserData = async (authToken) => {
    if (!authToken) return;

    try {
      const res = await fetch("/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: authToken,
        }),
      });

      if (res.status === 200) {
        const userData = await res.json();
        setData(userData);
      } else if (res.status === 401) {
        // Token is invalid/expired - clear it
        localStorage.removeItem("token");
        setToken(null);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    // Get token from localStorage
    const authToken = localStorage.getItem("token");
    setToken(authToken);

    if (authToken) {
      getUserData(authToken);
    }
  }, []);

  const RenderNavbar = () => {

    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    
    if (token) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              HOME
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/courses">
              COURSES
            </NavLink>
          </li>

          <li className="nav-item">
            <button
              type="submit"
              className="btn btn-primary"
              id="logout"
              name="logout"
              onClick={ () => {handleLogout()}}
            >
              LOG OUT
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              HOME
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              LOGIN
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              REGISTER
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-3">
        <NavLink className="navbar-brand" to="/">
          My Website
        </NavLink>

        {/* Toggle button for mobile (optional) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token && (
            <ul className="navbar-nav me-auto">
              <NavLink
                className="nav-link"
                to="#"
                style={{ cursor: "default", fontStyle: "italic" }}
              >
                Hello,{" "}
                <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {data?.userName}
                </span>
              </NavLink>
            </ul>
          )}
          <ul className="navbar-nav ms-auto">
            <RenderNavbar />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
