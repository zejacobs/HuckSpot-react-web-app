import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userClient from "../Clients/userClient";

export default function UserTournaments() {
  const [tournaments, setUserTournaments] = useState([]);

  const fetchUserTournaments = async () => {
    const response = await userClient.fetchUserTournaments();
    if (response) {
      setUserTournaments(response);
    }
  };
  useEffect(() => {
    fetchUserTournaments();
  }, []);

  return (
    <div>
      {tournaments.length > 0 ? (
        <ul className="list-group">
          {tournaments.map((tournament: any) => (
            <li className="list-group-item" key={tournament.tournamentId}>
              <Link to={`/Details/Tournaments/${tournament.tournamentId}`}>
                {tournament.tournamentName} {tournament.tournamentDate}
              </Link>
            </li>
          ))}{" "}
        </ul>
      ) : (
        <h4>No Tournament Registrations</h4>
      )}
    </div>
  );
}
