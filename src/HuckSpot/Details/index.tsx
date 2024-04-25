import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { LuPlus, LuMinusCircle } from "react-icons/lu";
import { GrLike, GrDislike } from "react-icons/gr";
import * as discItApiClient from "../Clients/discItApiClient";

function Details() {
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

  const isLoggedIn = true; // Change once login implemented

  const { discId } = useParams();
  const fetchDiscData = async () => {
    const response = await discItApiClient.fetchDiscById(discId);
    setDiscData(response);
  };
  useEffect(() => {
    fetchDiscData();
  }, []);

  return (
    <div className="container border bg-light p-4">
      <h1>
        {discData?.brand} {discData?.name}
      </h1>
      <h4>
        {discData?.stability} {discData?.category}
      </h4>
      <h6>Speed: {discData?.speed}</h6>
      <h6>Glide: {discData?.glide}</h6>
      <h6>Turn: {discData?.turn}</h6>
      <h6>Fade: {discData?.fade}</h6>
      <img style={{ border: "2px solid" }} src={discData?.pic} alt="Flight Chart Unavailable"></img> <br />
      <div className="mt-2">
        {isLoggedIn && (
          <span>
            {true && (
              <button className="btn btn-success">
                Like <GrLike />
              </button>
            )}
            {true && (
              <button className="btn btn-danger">
                Unlike <GrDislike />
              </button>
            )}
            <span className="ms-4 me-4">
              {true && (
                <button className="btn btn-warning">
                  Add to Bag <LuPlus />
                </button>
              )}
              {true && (
                <button className="btn btn-danger">
                  Remove from Bag <LuMinusCircle />
                </button>
              )}
            </span>
          </span>
        )}
        <a href={discData?.link}>
          <button className="btn btn-primary">
            Buy Disc <TiShoppingCart />
          </button>
        </a>
      </div>{" "}
      <br />
      <h2>Reviews</h2>
    </div>
  );
}

export default Details;
