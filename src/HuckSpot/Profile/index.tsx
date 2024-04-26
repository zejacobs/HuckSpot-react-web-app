import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { setCurrentUser } from "../userReducer";
import * as userClient from "../Clients/userClient";
import BaggedDiscs from "./BaggedDiscs";
import LikedDiscs from "./LikedDiscs";
import UserTournaments from "./UserTournaments";
import { ImProfile } from "react-icons/im";

function Profile() {
  const [error, setError] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    pdgaNum: "",
    role: "USER",
    likedDiscs: [],
    baggedDiscs: [],
    tournaments: [],
  });

  const fetchOtherProfile = async (userId: string) => {
    try {
      const userProfile = await userClient.findUserById(userId);
      setProfile(userProfile);
    } catch (err) {
      setError("User Does Not Exist");
    }
  };
  const fetchCurrentProfile = async () => {
    try {
      const user = await userClient.profile();
      setProfile(user);
      dispatch(setCurrentUser(user));
    } catch (err: any) {
      dispatch(setCurrentUser(null));
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchOtherProfile(userId);
    } else {
      fetchCurrentProfile();
    }
  }, []);

  const saveProfile = async () => {
    await userClient.updateUser(profile);
    dispatch(setCurrentUser(profile));
  };

  return (
    <div>
      <h1>
        <ImProfile /> Profile
      </h1>{" "}
      <hr />
      <div className="container">
        {userId ? (
          <div>
            <h2 className="mb-4">
              {profile.firstName} {profile.lastName}
            </h2>
            {profile.pdgaNum && (
              <h2 className="mb-4">
                PDGA# <a href={`https://www.pdga.com/player/${profile.pdgaNum}`}>{profile.pdgaNum}</a>
              </h2>
            )}
            <h2 className="mb-4">Role: {profile.role}</h2>
          </div>
        ) : !currentUser ? (
          <h2>
            <Link to={"/Login"}>Login</Link> to access user profile
          </h2>
        ) : (
          <>
            <div>
              <h2>
                {profile.firstName} {profile.lastName}
              </h2>
              <div className="form-group row mt-2">
                <label htmlFor="username" className="col-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-4">
                  <input
                    className="form-control mb-2"
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="password" className="col-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-4">
                  <input
                    className="form-control mb-2"
                    id="password"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="fname" className="col-2 col-form-label">
                  First Name
                </label>
                <div className="col-sm-4">
                  <input
                    className="form-control mb-2"
                    id="fname"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="lname" className="col-2 col-form-label">
                  Last Name
                </label>
                <div className="col-sm-4">
                  <input
                    className="form-control mb-2"
                    id="lname"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="pdga" className="col-2 col-form-label">
                  PDGA #
                </label>
                <div className="col-sm-4">
                  <input
                    className="form-control mb-2"
                    id="pdga"
                    value={profile.pdgaNum}
                    type="number"
                    onChange={(e) => setProfile({ ...profile, pdgaNum: e.target.value })}
                  />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="email" className="col-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-4">
                  <input className="form-control mb-2" id="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />{" "}
                </div>
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="role" className="col-2 col-form-label">
                  Role
                </label>
                <div className="col-sm-4">
                  <select className="form-control mb-2" id="role" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                    <option value="USER">User</option>
                    <option value="TD">Tournament Director</option>
                    <option value="ADMIN">Admin</option>
                  </select>{" "}
                </div>
              </div>
              <button className="btn btn-primary col-2" onClick={saveProfile}>
                Save Profile
              </button>
              {(profile.role === "TD" || profile.role === "ADMIN") && (
                <>
                  <Link to={"/Admin/Tournaments"} className="btn btn-info col-2 ms-2">
                    Tournaments
                  </Link>
                </>
              )}
              {profile.role === "ADMIN" && (
                <>
                  <Link to={"/Admin/Users"} className="btn btn-warning col-2 ms-2">
                    Users
                  </Link>
                </>
              )}
            </div>
            <hr />{" "}
          </>
        )}

        {(currentUser || userId) && (
          <>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active me-2"
                  id="nav-bagged-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-bagged"
                  type="button"
                  role="tab"
                  aria-controls="nav-bagged"
                  aria-selected="true"
                >
                  Bagged Discs
                </button>
                <button
                  className="nav-link me-2"
                  id="nav-liked-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-liked"
                  type="button"
                  role="tab"
                  aria-controls="nav-liked"
                  aria-selected="false"
                >
                  Liked Discs
                </button>
                <button
                  className="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Tournaments
                </button>
              </div>
            </nav>
            <div className="tab-content container mt-4" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-bagged" role="tabpanel" aria-labelledby="nav-bagged-tab">
                <BaggedDiscs />
              </div>
              <div className="tab-pane fade" id="nav-liked" role="tabpanel" aria-labelledby="nav-liked-tab">
                <LikedDiscs />
              </div>
              <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <UserTournaments />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
