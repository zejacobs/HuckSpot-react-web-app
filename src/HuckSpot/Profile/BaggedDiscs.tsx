import { Link } from "react-router-dom";

export default function BaggedDiscs({ baggedDiscs }: any) {
  return (
    <div>
      {baggedDiscs.length > 0 ? (
        <div>
          <h4>Putters and Approach</h4>
          <ul className="list-group">
            {baggedDiscs
              .filter((disc: any) => disc.category === "Putter" || disc.category === "Approach")
              .map((disc: any) => (
                <li className="list-group-item">
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Midranges</h4>
          <ul className="list-group">
            {baggedDiscs
              .filter((disc: any) => disc.category === "Midrange")
              .map((disc: any) => (
                <li className="list-group-item">
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Control Drivers</h4>
          <ul className="list-group">
            {baggedDiscs
              .filter((disc: any) => disc.category === "Control Driver")
              .map((disc: any) => (
                <li className="list-group-item">
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Distance Drivers</h4>
          <ul className="list-group">
            {baggedDiscs
              .filter((disc: any) => disc.category === "Distance Driver")
              .map((disc: any) => (
                <li className="list-group-item">
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
        </div>
      ) : (
        <h4>No Bagged Discs</h4>
      )}
    </div>
  );
}
