import { Link } from "react-router-dom";

export default function UserTournaments({ tournaments }: any) {
  return (
    <div>
      {tournaments.length > 0 ? (
        <ul className="list-group">
          {tournaments.map((tournament: any) => (
            <li className="list-group-item">
              <Link to={`/Details/${tournament._id}`}>
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
