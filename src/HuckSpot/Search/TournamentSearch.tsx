import { useState } from "react";
import { useNavigate } from "react-router";

export default function TournamentSearch() {
  const [searchParams, setSearchParams] = useState({ name: "", course: "", date: "", _id: "" });
  const navigate = useNavigate();

  const formatQueryString = () => {
    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        query.append(key, value);
      }
    });
    return query;
  };
  const submitTournamentSearch = () => {
    const queryString = formatQueryString();
    navigate(`./Tournaments?${queryString}`);
  };

  return (
    <>
      <h2>Tournament Search</h2> <br />
      <div className="container">
        <h4>Search Citeria</h4>
        <div className="form-group row mt-2">
          <label htmlFor="search-name" className="col-2 col-form-label">
            Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-name"
              placeholder="Name"
              onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-course" className="col-2 col-form-label">
            Course
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-course"
              placeholder="Course"
              onChange={(e) => setSearchParams({ ...searchParams, course: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-date" className="col-2 col-form-label">
            Date
          </label>
          <div className="col-sm-4">
            <input type="date" className="form-control" id="search-date" onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })} />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-tournamentId" className="col-2 col-form-label">
            TournamentId
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-tournamentId"
              placeholder="Id"
              onChange={(e) => setSearchParams({ ...searchParams, _id: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-4" onClick={submitTournamentSearch}>
          Submit Tournament Search
        </button>
      </div>
    </>
  );
}
