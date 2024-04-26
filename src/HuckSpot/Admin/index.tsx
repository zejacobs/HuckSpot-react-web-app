import { useParams } from "react-router";
import TournamentTable from "./TournamentTable";
import UserTable from "./UserTable";

export default function Admin() {
  const { adminType } = useParams();

  return (
    <div>
      {adminType === "Tournaments" && <TournamentTable />}
      {adminType === "Users" && <UserTable />}
    </div>
  );
}
