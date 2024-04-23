import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoFlashlightOutline } from "react-icons/io5";
import { GrTrophy } from "react-icons/gr";
import { SlHome } from "react-icons/sl";
import { Link } from "react-router-dom";
import * as discItApiClient from "../Clients/discItApiClient";

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

  const setDiscSpotlight = async () => {
    const randomDisc = await discItApiClient.fetchRandomDisc();
    setDiscData(randomDisc);
  };
  useEffect(() => {
    setDiscSpotlight();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1>
        <SlHome /> Home
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
            </div>
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col border bg-light p-4">
            <h2>
              <Link to={"/Login"}>Login</Link> for more content
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
