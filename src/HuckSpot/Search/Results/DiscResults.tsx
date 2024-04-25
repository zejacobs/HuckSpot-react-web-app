import { useEffect, useState } from "react";
import * as discItApiClient from "../../Clients/discItApiClient";
import { Link } from "react-router-dom";
import { FiFrown } from "react-icons/fi";

export default function DiscResults({ queryString }: any) {
  interface discDataType {
    id: string;
    name: string;
    brand: string;
    category: string;
    speed: string;
    glide: string;
    turn: string;
    fade: string;
    stability: string;
    link: string;
    pic: string;
  }
  const [discs, setDiscs] = useState<discDataType[]>([]);

  const fetchDiscResults = async () => {
    const results = await discItApiClient.fetchDiscResults({ queryString });
    setDiscs(results);
  };
  useEffect(() => {
    fetchDiscResults();
  }, []);

  return (
    <div className="container">
      {discs.length > 0 ? (
        <>
          <h2>Disc Results</h2>
          <ul className="list-group">
            {discs.map((disc) => (
              <li className="list-group-item list-group-item-action py-3" key={disc.id}>
                <Link style={{ textDecoration: "none" }} to={`/Details/${disc.id}`}>
                  <h3>
                    {disc.brand} {disc.name}&nbsp;&nbsp;&nbsp;{disc.speed}&nbsp;|&nbsp;{disc.glide}&nbsp;|&nbsp;{disc.turn}&nbsp;|&nbsp;{disc.fade}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>
          No Discs Found <FiFrown />
        </h2>
      )}
    </div>
  );
}
