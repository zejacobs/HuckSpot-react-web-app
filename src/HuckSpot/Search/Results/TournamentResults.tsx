import { useEffect, useState } from "react";
import * as tournamentClient from "../../Clients/tournamentClient";
import { FiFrown } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TournamentResults({ queryString }: any) {
  interface tournamentDataType {
    _id: string;
    name: string;
    course: string;
    date: string;
  }
  const [tournaments, setTournaments] = useState<tournamentDataType[]>([]);

  const fetchTournamentResults = async () => {
    const results = await tournamentClient.findTournamentsByQuery(queryString);
    setTournaments(results);
  };
  useEffect(() => {
    fetchTournamentResults();
  }, []);

  return (
    <div className="container">
      {tournaments.length > 0 ? (
        <>
          <h2>Tournament Results</h2>
          <ul className="list-group">
            {tournaments.map((tournament) => (
              <li className="list-group-item list-group-item-action py-3" key={tournament._id}>
                <Link style={{ textDecoration: "none" }} to={`/Details/Tournaments/${tournament._id}`}>
                  <h3>
                    {tournament.name}&nbsp;@&nbsp;{tournament.course}&nbsp;&nbsp;{tournament.date}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>
          No Tournaments Found <FiFrown />
        </h2>
      )}
    </div>
  );
}
