import { useState } from "react";
import { useNavigate } from "react-router";
import * as userClient from "../Clients/userClient";
import { GrUserNew } from "react-icons/gr";

function Register() {
  const [hasPdgaNum, setHasPdgaNum] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
    pdgaNum: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const registerUser = async () => {
    if (document.forms[0].checkValidity()) {
      try {
        await userClient.register(user);
        navigate("/Profile");
      } catch (err: any) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>
        <GrUserNew /> Register
      </h1>
      <hr />
      <form className="needs-validation" id="reg-form">
        <div className="form-group row">
          <label htmlFor="reg-username" className="col-2 col-form-label">
            Username
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="reg-username"
              placeholder="Username"
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="reg-password" className="col-2 col-form-label">
            Password
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="reg-password"
              placeholder="Password"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="reg-first" className="col-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="reg-first"
              placeholder="First"
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="reg-last" className="col-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="reg-last"
              placeholder="Last"
              onChange={(e) =>
                setUser({
                  ...user,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="reg-email" className="col-2 col-form-label">
            Email
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="reg-email"
              placeholder="user@email.com"
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="reg-role" className="col-2 col-form-label">
            Role
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              onChange={(e) =>
                setUser({
                  ...user,
                  role: e.target.value,
                })
              }
            >
              <option value="USER">User</option>
              <option value="TOURNAMENT_DIRECTOR">Tournament Director</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
        <div className="form-group row mt-4">
          <span>
            <label className="form-label me-4">Do you have a PDGA Number?</label>
            <div className="form-check-inline me-4">
              <input className="form-check-input me-1" type="radio" id="yes-pdga" readOnly onClick={() => setHasPdgaNum(true)} checked={hasPdgaNum} />
              <label className="form-check-label" htmlFor="yes-pdga">
                Yes
              </label>
            </div>
            <div className="form-check-inline">
              <input
                className="form-check-input me-1"
                type="radio"
                name="exampleRadios"
                id="no-pdga"
                readOnly
                onClick={() => setHasPdgaNum(false)}
                checked={!hasPdgaNum}
              />
              <label className="form-check-label" htmlFor="no-pdga">
                No
              </label>
            </div>
          </span>
        </div>
        {hasPdgaNum && (
          <div className="form-group row mt-2">
            <label htmlFor="reg-pdga" className="col-2 col-form-label">
              PDGA #
            </label>
            <div className="col-sm-4">
              <input
                type="number"
                className="form-control"
                id="reg-pdga"
                placeholder="123456"
                onChange={(e) =>
                  setUser({
                    ...user,
                    pdgaNum: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger col-3 mt-2">{error}</div>}
        <button className="btn btn-primary col-2 mt-4" type="submit" onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
