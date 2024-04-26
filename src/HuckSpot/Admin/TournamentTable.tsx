import { useEffect, useState } from "react";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as tournamentClient from "../Clients/tournamentClient";

export default function TournamentTable() {
  const addIconStyle = { color: "green", fontSize: "2.5em" };
  interface Tournament {
    _id: string;
    name: string;
    course: string;
    date: string;
    tdName: string;
    tdId: string;
    registeredPlayers: [];
  }
  const { currentUser } = useSelector((state: any) => state.user);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournament, setTournament] = useState<Tournament>({
    _id: "",
    name: "",
    course: "",
    date: "",
    tdName: `${currentUser ? currentUser.firstName : ""} ${currentUser ? currentUser.lastName : ""}`,
    tdId: `${currentUser ? currentUser._id : ""}`,
    registeredPlayers: [],
  });

  const fetchTournaments = async () => {
    const tournaments = await tournamentClient.findAllTournaments();
    setTournaments(tournaments);
  };
  useEffect(() => {
    fetchTournaments();
  }, []);

  const deleteTournament = async (tournament: Tournament) => {
    try {
      await tournamentClient.deleteTournament(tournament);
      setTournaments(tournaments.filter((t) => t._id !== tournament._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectTournament = async (tournament: Tournament) => {
    try {
      const t = await tournamentClient.findTournamentById(tournament._id);
      setTournament(t[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const createTournament = async () => {
    try {
      const newTournament = await tournamentClient.createTournament(tournament);
      console.log(newTournament);
      setTournaments([newTournament, ...tournaments]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTournament = async () => {
    try {
      const status = await tournamentClient.updateTournament(tournament);
      setTournaments(tournaments.map((t) => (t._id === tournament._id ? tournament : t)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Tournament Editior</h1> <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>
              <input className="form-control" value={tournament.name} onChange={(e) => setTournament({ ...tournament, name: e.target.value })} />
            </td>
            <td>
              <input className="form-control" value={tournament.course} onChange={(e) => setTournament({ ...tournament, course: e.target.value })} />
            </td>
            <td>
              <input className="form-control" type="date" value={tournament.date} onChange={(e) => setTournament({ ...tournament, date: e.target.value })} />
            </td>
            <td>
              <BsFillCheckCircleFill onClick={updateTournament} className="me-2 text-success fs-1 text" />
              <BsPlusCircleFill style={addIconStyle} onClick={createTournament} />
            </td>
          </tr>
        </thead>
      </table>{" "}
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Date</th>
            <th>Tournament Director</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament: any) => (
            <tr key={tournament?._id}>
              <td>
                <Link to={`/Details/Tournaments/${tournament?._id}`}>{tournament?.name}</Link>
              </td>
              <td>{tournament?.course}</td>
              <td>{tournament?.date}</td>
              <td>{tournament?.tdName}</td>

              <td>
                <button className=" btn btn-danger me-2" onClick={() => deleteTournament(tournament)}>
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectTournament(tournament)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
