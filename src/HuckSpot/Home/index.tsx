import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoFlashlightOutline } from "react-icons/io5";
import { GrTrophy } from "react-icons/gr";
import { Link } from "react-router-dom";

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

  const DISC_BASE_API = "https://discit-api.fly.dev/disc";
  const fetchRandomDisc = async () => {
    const response = await axios.get(`${DISC_BASE_API}`);
    const numDiscs = response.data.length;
    const randomDiscIndex = Math.floor(Math.random() * numDiscs);
    setDiscData(response.data[randomDiscIndex]);
  };
  useEffect(() => {
    fetchRandomDisc();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>HuckSpot - Home</h1>
      <hr />
      <div className="row">
        <div className="col-md-6 border p-4" onClick={() => navigate(`/Details/${discData?.id}`)}>
          <h2>
            Disc Spotlight <IoFlashlightOutline />
          </h2>
          <hr />
          <h4>
            {discData?.brand} {discData?.name}
          </h4>
          <h6>Speed: {discData?.speed}</h6>
          <h6>Glide: {discData?.glide}</h6>
          <h6>Turn: {discData?.turn}</h6>
          <h6>Fade: {discData?.fade}</h6>
          <img style={{ border: "1px solid", width: "auto", height: "40%" }} src={discData?.pic} alt="No Flight Chart Available" />
        </div>
        <div className="col-md-6 border p-4">
          <h2>
            Recently Added Tournaments <GrTrophy />
          </h2>{" "}
          <hr />
        </div>
      </div>
      <div className="row mt-4">
        <h2>
          <Link to={"/Login"}>Login</Link> for more content
        </h2>
      </div>
    </div>
  );
}

export default Home;
