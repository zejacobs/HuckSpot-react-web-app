import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as userClient from "../Clients/userClient";
import { useSelector } from "react-redux";

export default function UserTournaments() {
  const [tournaments, setUserTournaments] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const { userId } = useParams();

  const fetchUserTournaments = async () => {
    let response;
    if (userId) {
      response = await userClient.fetchUserTournaments(userId);
    } else if (currentUser) {
      response = await userClient.fetchUserTournaments(currentUser._id);
    }
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
