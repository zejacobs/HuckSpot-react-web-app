import { useLocation, useParams } from "react-router";
import DiscResults from "./DiscResults";
import UserResults from "./UserResults";
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
      {searchType === "Tournaments" && <h1>TOURNEYS</h1>}
      {searchType === "Users" && <UserResults queryString={search} />}
    </div>
  );
}
