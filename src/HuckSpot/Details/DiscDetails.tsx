import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store";
import * as discItApiClient from "../Clients/discItApiClient";
import * as likeClient from "../Clients/likeClient";
import * as userClient from "../Clients/userClient";
import { TiShoppingCart } from "react-icons/ti";
import { LuPlus, LuMinusCircle } from "react-icons/lu";
import { GrLike, GrDislike } from "react-icons/gr";
import { setCurrentUser } from "../userReducer";

function DiscDetails() {
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
  const [profile, setProfile] = useState({ _id: "", likedDiscs: [], baggedDiscs: [] });
  const [isBagged, setIsBagged] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = store.getState().user;

  const { discId } = useParams();

  const fetchDiscData = async () => {
    const response = await discItApiClient.fetchDiscById(discId);
    setDiscData(response);
    if (currentUser) {
      console.log(currentUser);
      setProfile(currentUser);
      console.log(profile.likedDiscs.find((disc: any) => disc.discId == discId));
      setIsLiked(!!profile.likedDiscs.find((disc: any) => disc.discId == discId));
      console.log(profile.baggedDiscs.find((disc: any) => disc.discId == discId));
      setIsBagged(!!profile.baggedDiscs.find((disc: any) => disc.discId == discId));
    }
  };
  useEffect(() => {
    fetchDiscData();
  }, [currentUser, profile]);

  const likeDisc = async () => {
    const likedDisc = {
      discId: discData?.id,
      name: `${discData?.brand} ${discData?.name}`,
      category: discData?.category,
    };
    await likeClient.userLikesDisc(likedDisc);
    setIsLiked(true);
  };
  const unlikeDisc = async () => {
    await likeClient.userUnlikesDisc(discId);
    setIsLiked(false);
  };
  const bagDisc = async () => {
    setIsBagged(true);
  };
  const unbagDisc = async () => {
    setIsBagged(false);
  };

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
        {currentUser && (
          <span>
            {!isLiked ? (
              <button className="btn btn-success" onClick={likeDisc}>
                Like <GrLike />
              </button>
            ) : (
              <button className="btn btn-danger" onClick={unlikeDisc}>
                Unlike <GrDislike />
              </button>
            )}
            <span className="ms-4 me-4">
              {!isBagged ? (
                <button className="btn btn-warning" onClick={bagDisc}>
                  Add to Bag <LuPlus />
                </button>
              ) : (
                <button className="btn btn-danger" onClick={unbagDisc}>
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
      <h2>Liked By</h2>
    </div>
  );
}

export default DiscDetails;
