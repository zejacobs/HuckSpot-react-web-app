import { useNavigate } from "react-router";

export default function TournamentSearch() {
  const navigate = useNavigate();
  const submitTournamentSearch = () => {
    navigate("/Search/Tournaments");
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
            <input type="text" className="form-control" id="search-name" placeholder="Name" />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-brand" className="col-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="search-brand" placeholder="Brand" />
          </div>
        </div>
        <button className="btn btn-primary mt-4" onClick={submitTournamentSearch}>
          Submit Tournament Search
        </button>
      </div>
    </>
  );
}
