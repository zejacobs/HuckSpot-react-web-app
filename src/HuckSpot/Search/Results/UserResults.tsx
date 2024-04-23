import { useEffect, useState } from "react";
import { FiFrown } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as userClient from "../../Clients/userClient";

export default function UserResults({ queryString }: any) {
  interface userDataType {
    _id: string;
    firstName: string;
    lastName: string;
    pdgaNum: string;
  }
  const [users, setUsers] = useState<userDataType[]>([]);

  const fetchUserResults = async () => {
    const results = await userClient.findUsersByQuery(queryString);
    setUsers(results);
  };
  useEffect(() => {
    fetchUserResults();
  }, []);

  return (
    <div className="container">
      {users.length > 0 ? (
        <>
          <h2>User Results</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item list-group-item-action py-3" key={user._id}>
                <Link style={{ textDecoration: "none" }} to={`/Profile/${user._id}`}>
                  <h3>
                    {user.firstName}&nbsp;{user.lastName}&nbsp;&nbsp;{user.pdgaNum && `PDGA# ${user.pdgaNum}`}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>
          No Users Found <FiFrown />
        </h2>
      )}
    </div>
  );
}
