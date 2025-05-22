import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    cpass: "",
  });

  const handleInputs = (e) => {
    let namee = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [namee]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    if (user.password !== user.cpass) {
      window.alert("Passwords don't match!");
      return;
    }

    const res = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 201) {
      localStorage.setItem("token", data.token);
      window.alert("Registration Successful");

      history.push("/");
      window.location.reload();
    } else {
      window.alert("Registration Failed");
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-7 col-sm-6 ">
              <h1 className="mt-5">Welcome!</h1>
            </div>

            <div className="col-12 col-md-5 col-sm-6">
              <form method="POST" onSubmit={PostData}>
              {/* Error: i added onSubmit to button and spent an hour figuring out the issue*/}
                <div className="form-group">
                  <label>Your Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={user.userName}
                    onChange={handleInputs}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone No.</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Enter your Phone No."
                  />
                </div>
                <div className="form-group">
                  <label>Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Enter your Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password*</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpass"
                    name="cpass"
                    value={user.cpass}
                    onChange={handleInputs}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="text-decoration-none fw-bold"
                    >
                      Sign in here
                    </NavLink>
                  </p>
                </div>
                <br />
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="register"
                  name="register"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
