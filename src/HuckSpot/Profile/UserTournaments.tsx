import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userClient from "../Clients/userClient";

export default function UserTournaments() {
  const [tournaments, setUserTournaments] = useState([]);

  const fetchUserTournaments = async () => {
    const response = await userClient.fetchUserTournaments();
    console.log(response);
    setUserTournaments(response);
  };
  useEffect(() => {
    fetchUserTournaments();
  }, []);

  return (
    <div>
      {tournaments.length > 0 ? (
        <ul className="list-group">
          {tournaments.map((tournament: any) => (
            <li className="list-group-item">
              <Link to={`/Details/Tournaments/${tournament._id}`}>
                {tournament.name} {tournament.date}
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
