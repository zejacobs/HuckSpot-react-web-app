import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../userReducer";
import * as userClient from "../Clients/userClient";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (document.forms[0].checkValidity()) {
      try {
        const currentUser = await userClient.login(credentials);
        dispatch(setCurrentUser(currentUser));
        navigate("/Profile");
      } catch (err: any) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1> <hr />
      {error && <div className="alert alert-danger col-3 mt-2">{error}</div>}
      <form className="needs-validation">
        <input
          className="form-control w-25 mb-2"
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              username: e.target.value,
            })
          }
          required
        />
        <input
          className="form-control w-25 mb-2"
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
          required
        />
        <button className="btn btn-primary w-25 mb-2" type="submit" onClick={handleLogin}>
          Login
        </button>{" "}
        <br />
        <Link to="/Register">
          <button className="btn btn-success w-25">Register</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
