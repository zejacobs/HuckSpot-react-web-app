import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoFlashlightOutline } from "react-icons/io5";
import { GrTrophy } from "react-icons/gr";
import { SlHome } from "react-icons/sl";
import { Link } from "react-router-dom";
import * as discItApiClient from "../Clients/discItApiClient";
import * as tournamentClient from "../Clients/tournamentClient";
import * as likesClient from "../Clients/likeClient";
import * as userClient from "../Clients/userClient";
import { useSelector } from "react-redux";

function Home() {
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
  const [discData, setDiscData] = useState<discDataType>();
  const [recentTournaments, setRecentTournaments] = useState([]);
  const [recentLikes, setRecentLikes] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);

  const fetchDiscSpotlight = async () => {
    const randomDisc = await discItApiClient.fetchRandomDisc();
    setDiscData(randomDisc);
  };
  const fetchRecentTournaments = async () => {
    const tournaments = await tournamentClient.getRecentlyAddedTournaments();
    setRecentTournaments(tournaments);
  };
  const fetchRecentActivity = async () => {
    const likes = await likesClient.findUserRecentLikes(currentUser._id);
    setRecentLikes(likes);
    const registrations = await userClient.findUserRecentTournamentRegistrations(currentUser._id);
    setRecentRegistrations(registrations);
  };
  useEffect(() => {
    fetchDiscSpotlight();
    fetchRecentTournaments();
    if (currentUser) {
      fetchRecentActivity();
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1>
        <SlHome /> Home {currentUser && ` - Welcome ${currentUser.firstName}!`}
      </h1>{" "}
      <hr />
      <div className="container">
        <div className="row g-2">
          <div className="col-lg" onClick={() => navigate(`/Details/${discData?.id}`)}>
            <div className="border bg-light p-4 h-100">
              <h2>
                <IoFlashlightOutline /> Disc Spotlight
              </h2>
              <hr />
              <div className="row align-items-center">
                <div className="col-4">
                  <h4>
                    {discData?.brand} {discData?.name}
                  </h4>
                  <h6>Speed: {discData?.speed}</h6>
                  <h6>Glide: {discData?.glide}</h6>
                  <h6>Turn: {discData?.turn}</h6>
                  <h6>Fade: {discData?.fade}</h6>
                </div>
                <div className="col-8">
                  <img style={{ border: "1px solid", width: "100%", height: "100%" }} src={discData?.pic} alt="No Flight Chart Available" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg ">
            <div className="border bg-light p-4 h-100">
              <h2>
                <GrTrophy /> Recent Tournaments
              </h2>{" "}
              <hr />
              {!!recentTournaments ? (
                <ul>
                  {recentTournaments.map((tournament: any) => (
                    <li className="mb-4">
                      <Link style={{ textDecoration: "none" }} to={`/Details/Tournaments/${tournament._id}`}>
                        {tournament.name} @ {tournament.course}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4>No Recently Added Tournaments</h4>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <div className="border bg-light p-4">
              {!currentUser ? (
                <h2>
                  <Link to={"/Login"}>Login</Link> for more content
                </h2>
              ) : (
                <>
                  <h2>Recent Activity</h2> <hr />
                  <div className="container row">
                    <div className="col">
                      <h5>Recent Likes</h5>
                      <ul>
                        {recentLikes.map((l: any) => (
                          <li className="mb-4">
                            <Link style={{ textDecoration: "none" }} to={`/Details/Discs/${l.discId}`}>
                              {l.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col">
                      <h5>Recent Tournament Registrations</h5>
                      <ul>
                        {recentRegistrations.map((t: any) => (
                          <li className="mb-4">
                            <Link style={{ textDecoration: "none" }} to={`/Details/Tournaments/${t.tournamentId}`}>
                              {t.tournamentName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
