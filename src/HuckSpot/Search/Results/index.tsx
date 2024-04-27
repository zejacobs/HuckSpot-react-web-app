import { useLocation, useParams } from "react-router";
import DiscResults from "./DiscResults";
import UserResults from "./UserResults";
import TournamentResults from "./TournamentResults";
import { GrSearch } from "react-icons/gr";

export default function SearchResults() {
  const { searchType } = useParams();
  const { search } = useLocation();

  return (
    <div>
      <h1>
        <GrSearch /> Search Results
      </h1>{" "}
      <hr />
      {searchType === "Discs" && <DiscResults queryString={search} />}
      {searchType === "Tournaments" && <TournamentResults queryString={search} />}
      {searchType === "Users" && <UserResults queryString={search} />}
    </div>
  );
}
