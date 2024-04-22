import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as client from "../Users/client";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (document.forms[0].checkValidity()) {
      await client.login(credentials);
      navigate("/Profile");
    }
  };

  return (
    <div>
      <h1>Login</h1> <hr />
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
        <button className="btn btn-primary w-25 mb-2" onClick={handleLogin}>
          Login
        </button>{" "}
        <br />
        <button className="btn btn-success w-25" type="submit" onClick={handleLogin}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
