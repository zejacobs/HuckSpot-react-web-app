import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as likeClient from "../Clients/likeClient";
import { useSelector } from "react-redux";

export default function LikedDiscs() {
  const [likedDiscs, setLikedDiscs] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const { userId } = useParams();

  const fetchUserLikes = async () => {
    let response;
    if (userId) {
      response = await likeClient.fetchDiscsUserLikes(userId);
    } else if (currentUser) {
      response = await likeClient.fetchDiscsUserLikes(currentUser._id);
    }
    if (response) {
      setLikedDiscs(response);
    }
  };
  useEffect(() => {
    fetchUserLikes();
  }, []);
  return (
    <div>
      {likedDiscs.length > 0 ? (
        <div>
          <h4>Putters and Approach</h4>
          <ul className="list-group mb-2">
            {likedDiscs
              .filter((disc: any) => disc.category === "Putter" || disc.category === "Approach")
              .map((disc: any) => (
                <li className="list-group-item" key={disc.discId}>
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Midranges</h4>
          <ul className="list-group mb-2">
            {likedDiscs
              .filter((disc: any) => disc.category === "Midrange")
              .map((disc: any) => (
                <li className="list-group-item" key={disc.discId}>
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Control Drivers</h4>
          <ul className="list-group mb-2">
            {likedDiscs
              .filter((disc: any) => disc.category === "Control Driver")
              .map((disc: any) => (
                <li className="list-group-item" key={disc.discId}>
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Hybrid Drivers</h4>
          <ul className="list-group mb-2">
            {likedDiscs
              .filter((disc: any) => disc.category === "Hybrid Driver")
              .map((disc: any) => (
                <li className="list-group-item" key={disc.discId}>
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
          <h4>Distance Drivers</h4>
          <ul className="list-group mb-2">
            {likedDiscs
              .filter((disc: any) => disc.category === "Distance Driver")
              .map((disc: any) => (
                <li className="list-group-item" key={disc.discId}>
                  <Link to={`/Details/Discs/${disc.discId}`}>{disc.name}</Link>
                </li>
              ))}{" "}
          </ul>
        </div>
      ) : (
        <h4>No Liked Discs</h4>
      )}
    </div>
  );
}
