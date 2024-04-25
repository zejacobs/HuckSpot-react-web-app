import { useState } from "react";
import DiscSearch from "./DiscSearch";
import TournamentSearch from "./TournamentSearch";
import UserSearch from "./UserSearch";
import { GrSearch } from "react-icons/gr";

function Search() {
  const [searchType, setSearchType] = useState("Disc");

  return (
    <div>
      <h1>
        <GrSearch /> Search
      </h1>{" "}
      <hr />
      <div className="mb-4">
        <button className="btn btn-secondary me-4" onClick={() => setSearchType("Disc")}>
          Disc Search
        </button>
        <button className="btn btn-secondary me-4" onClick={() => setSearchType("Tournament")}>
          Tournament Search
        </button>
        <button className="btn btn-secondary me-4" onClick={() => setSearchType("User")}>
          User Search
        </button>
      </div>
      {searchType === "Disc" && <DiscSearch />}
      {searchType === "Tournament" && <TournamentSearch />}
      {searchType === "User" && <UserSearch />}
    </div>
  );
}

export default Search;
