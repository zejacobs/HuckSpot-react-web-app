import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as tournamentClient from "../Clients/tournamentClient";
import * as userClient from "../Clients/userClient";
import { GrTrophy } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function TournamentDetails() {
  interface tournamentDataType {
    _id: string;
    name: string;
    course: string;
    date: string;
    tdName: string;
    tdId: string;
    registeredPlayers: [];
  }
  interface playerDataType {
    playerId: string;
    playerName: string;
  }

  const [tournamentData, setTournamentData] = useState<tournamentDataType>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredPlayers, setRegisteredPlayers] = useState<playerDataType[]>([]);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  const { tournamentId } = useParams();
  const fetchTournamentData = async () => {
    const response = await tournamentClient.findTournamentById(tournamentId); //GET TOURNEY DATA FROM SERVER
    setTournamentData(response[0]);

    if (currentUser) {
      const isUserRegistered = await userClient.isUserRegisteredforTournament(tournamentId);
      setIsRegistered(isUserRegistered);
    }
  };
  useEffect(() => {
    fetchTournamentData();
  }, []);

  const registerForTournament = async () => {
    const tourney = {
      tournamentId: tournamentData?._id,
      name: tournamentData?.name,
      date: tournamentData?.date,
    };
    await tournamentClient.registerUserForTournament(tourney);
    setRegisteredPlayers([{ playerId: currentUser._id, playerName: currentUser.name }, ...registeredPlayers]);
    setIsRegistered(true);
  };

  const unregisterForTournament = async () => {
    await tournamentClient.unregisterUserForTournament(tournamentId);
    setRegisteredPlayers(registeredPlayers.filter((player) => player.playerId !== currentUser._id));
    setIsRegistered(false);
  };

  return (
    <div className="container border bg-light p-4">
      <h1>
        <GrTrophy /> {tournamentData?.name}
      </h1>
      <div className="container mt-4">
        <h2 className="mb-3">Course: {tournamentData?.course}</h2>
        <h2 className="mb-3">Date: {tournamentData?.date}</h2>
        <h2 className="mb-5">
          Tournament Director: <Link to={`/Profile/${tournamentData?.tdId}`}>{tournamentData?.tdName}</Link>
        </h2>
        {currentUser && (
          <span>
            {!isRegistered ? (
              <button className="btn btn-success col-2" onClick={registerForTournament}>
                Register
              </button>
            ) : (
              <button className="btn btn-danger col-2" onClick={unregisterForTournament}>
                Unregister
              </button>
            )}
          </span>
        )}
      </div>
      <hr />
      <h4>Registered Players</h4>
      <ul>
        {registeredPlayers?.map((player: any) => (
          <li className="list-group-item" key={player.userId}>
            <Link to={`/Profile/${player.userId}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
