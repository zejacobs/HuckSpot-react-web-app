import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store";

export default function TournamentDetails() {
  interface tournamentDataType {
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
  const [tournamentData, setTournamentData] = useState<tournamentDataType>();

  const dispatch = useDispatch();
  const { currentUser } = store.getState().user;

  const { tournamentId } = useParams();
  const fetchTournamentData = async () => {
    //const response = await discItApiClient.fetchDiscById(discId); //GET TOURNEY DATA FROM SERVER
    //setDiscData(response);
  };
  useEffect(() => {
    fetchTournamentData();
  }, []);

  return (
    <div>
      <h1>TOURNAMENT</h1>
    </div>
  );
}
