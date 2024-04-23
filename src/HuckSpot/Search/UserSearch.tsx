import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserSearch() {
  const [userSearch, setUserSearch] = useState({ firstName: "", lastName: "", pdgaNum: "", profileId: "" });

  const navigate = useNavigate();
  const submitUserSearch = () => {
    navigate("/Search/Users");
  };

  return (
    <>
      <h2>User Search</h2> <br />
      <div className="container">
        <h4>Search Citeria</h4>
        <div className="form-group row mt-2">
          <label htmlFor="search-fname" className="col-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-fname"
              placeholder="First Name"
              onChange={(e) => setUserSearch({ ...userSearch, firstName: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-lname" className="col-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-lname"
              placeholder="Last Name"
              onChange={(e) => setUserSearch({ ...userSearch, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-pdga" className="col-2 col-form-label">
            PDGA #
          </label>
          <div className="col-sm-4">
            <input
              type="Number"
              className="form-control"
              id="search-pdga"
              placeholder="PDGA #"
              onChange={(e) => setUserSearch({ ...userSearch, pdgaNum: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-profile-id" className="col-2 col-form-label">
            Profile Id
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-profile-id"
              placeholder="Profile Id"
              onChange={(e) => setUserSearch({ ...userSearch, profileId: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-4" onClick={submitUserSearch}>
          Submit User Search
        </button>
      </div>
    </>
  );
}
