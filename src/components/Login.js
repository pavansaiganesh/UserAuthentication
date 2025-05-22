import {useState} from 'react'
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setData = async (e) => {
    e.preventDefault();

    const res = await fetch("/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      window.alert("Login Successful");
      localStorage.setItem("token", data.token);
      window.location.reload();
      history.push("/");
      window.location.reload();
    } 
    else {
      window.alert(data.error);
    }
  };


  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-md-3 offset-sm-1 ">
            <form method="POST" onSubmit={setData}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <span>
                Didn't Register?
                <NavLink to="/register"> register here!</NavLink>
              </span>
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                id="login"
                name="login"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;