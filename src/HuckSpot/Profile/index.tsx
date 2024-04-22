import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../Users/client";

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({ username: "", password: "", firstName: "", lastName: "", email: "", pdgaNum: "", role: "USER" });

  const fetchProfile = async () => {
    const profile = await client.profile();
    setProfile(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    //await client.updateUser(profile);
  };

  return (
    <div>
      <h1>Profile</h1> <hr />
      {userId && <h4>{userId}</h4>}
      <div className="w-25">
        <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100 mb-2">
          Users
        </Link>{" "}
        <br />
        <input className="form-control mb-2" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
        <input className="form-control mb-2" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
        <input className="form-control mb-2" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
        <input className="form-control mb-2" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
        <input className="form-control mb-2" value={profile.pdgaNum} type="number" onChange={(e) => setProfile({ ...profile, pdgaNum: e.target.value })} />
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
      <hr />
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
            Contact
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-bagged" role="tabpanel" aria-labelledby="nav-bagged-tab">
          Bagged discs
        </div>
        <div className="tab-pane fade" id="nav-liked" role="tabpanel" aria-labelledby="nav-liked-tab">
          Liked Discs
        </div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          ...
        </div>
      </div>
    </div>
  );
}

export default Profile;
