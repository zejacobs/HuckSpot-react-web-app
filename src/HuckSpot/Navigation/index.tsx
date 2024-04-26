import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.css";
import * as userClient from "../Clients/userClient";
import store from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../userReducer";
import { SlHome } from "react-icons/sl";
import { ImProfile } from "react-icons/im";
import { GrSearch, GrLogin, GrLogout, GrUserNew } from "react-icons/gr";
import { FaBars } from "react-icons/fa";

function Navigation() {
  const login = { label: "Login", icon: <GrLogin /> };
  const logout = { label: "Logout", icon: <GrLogout /> };
  const links = [
    { label: "Home", icon: <SlHome /> },
    { label: "Profile", icon: <ImProfile /> },
    { label: "Search", icon: <GrSearch /> },
    { label: "Register", icon: <GrUserNew /> },
  ];
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    confirmAlert({
      title: "Logout",
      message: `Are you sure you want to Logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await userClient.logout();
            dispatch(setCurrentUser(null));
            navigate("/Login");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="nav-bar">
      <div className="flex-row">
        <div className="col">
          <ul className="d-none d-lg-block">
            <li id="nav-bar-logo">
              <Link to={"/Home"}>
                <div className="px-2">HuckSpot</div>
              </Link>
            </li>
            <li className={pathname.includes("/Login") ? "wd-active" : ""}>
              {!currentUser ? (
                <Link to={`/${login.label}`}>
                  {login.icon} {login.label}
                </Link>
              ) : (
                <span onClick={handleLogout}>
                  {logout.icon} {logout.label}
                </span>
              )}
            </li>
            {links.map((link, index) => (
              <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                <Link to={`/${link.label}`}>
                  {link.icon} {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-block d-lg-none">
          <ul>
            <li id="nav-bar-logo">
              <Link to={"/Home"}>
                <div className="px-2">HuckSpot</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-block d-lg-none dropdown nav-dropdown-bar w-100 p-2">
          <button className="btn btn-light border float-end" type="button" id="nav-dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <FaBars style={{ scale: "150%" }} />
          </button>
          <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="nav-dropdownMenuButton">
            <li className="dropdown-item">
              <Link to="/Home">
                <SlHome id="account-icon" className="me-2" />
                Home
              </Link>
            </li>
            <li className="dropdown-item pt-3">
              <Link to="/Profile">
                <ImProfile className="me-2" />
                Profile
              </Link>
            </li>
            <li className="dropdown-item pt-3">
              <Link to="/Search">
                <GrSearch className="me-2" />
                Search
              </Link>
            </li>
            <li className="dropdown-item pt-3">
              <Link to="/Register">
                <GrUserNew className="me-2" />
                Register
              </Link>
            </li>
            {currentUser ? (
              <li className="dropdown-item pt-3">
                <div id="dropdown-logout" onClick={handleLogout}>
                  <GrLogout className="me-2" />
                  Logout
                </div>
              </li>
            ) : (
              <li className="dropdown-item pt-3">
                <Link to="/Login">
                  <GrLogin className="me-2" />
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
