import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../store";
import { setCurrentUser } from "../userReducer";
import * as userClient from "../Clients/userClient";
import BaggedDiscs from "./BaggedDiscs";
import LikedDiscs from "./LikedDiscs";
import UserTournaments from "./UserTournaments";
import { ImProfile } from "react-icons/im";

function Profile() {
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);

  const { userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = store.getState().user;
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
      navigate("/Login");
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    setCounter(counter + 1);
    if (userId) {
      fetchOtherProfile(userId);
    } else {
      fetchCurrentProfile();
    }
  }, [userId]);

  const saveProfile = async () => {
    await userClient.updateUser(profile);
    dispatch(setCurrentUser(profile));
  };

  return (
    <div>
      <h1>
        <ImProfile /> Profile
      </h1>{" "}
      {counter}
      <hr />
      {error ? (
        <h2>{error}</h2>
      ) : (
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
              <div className="w-25">
                <h2>
                  {profile.firstName} {profile.lastName}
                </h2>
                <input className="form-control mb-2" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                <input className="form-control mb-2" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                <input className="form-control mb-2" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                <input className="form-control mb-2" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                <input
                  className="form-control mb-2"
                  value={profile.pdgaNum}
                  type="number"
                  onChange={(e) => setProfile({ ...profile, pdgaNum: e.target.value })}
                />
                <input className="form-control mb-2" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <select className="form-control mb-2" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                  <option value="USER">User</option>
                  <option value="FACULTY">Tournament Director</option>
                  <option value="ADMIN">Admin</option>
                </select>{" "}
                <button className="btn btn-primary w-100 mb-2" onClick={saveProfile}>
                  Save
                </button>
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
                  <BaggedDiscs baggedDiscs={profile.baggedDiscs} />
                </div>
                <div className="tab-pane fade" id="nav-liked" role="tabpanel" aria-labelledby="nav-liked-tab">
                  <LikedDiscs likedDiscs={profile.likedDiscs} />
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <UserTournaments tournaments={profile.tournaments} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
