import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import * as discItApiClient from "../Clients/discItApiClient";
import * as likeClient from "../Clients/likeClient";
import * as userClient from "../Clients/userClient";
import * as discClient from "../Clients/discClient";
import { TiShoppingCart } from "react-icons/ti";
import { LuPlus, LuMinusCircle } from "react-icons/lu";
import { GrLike, GrDislike } from "react-icons/gr";
import { Link } from "react-router-dom";

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

  interface likeDataType {
    userId: string;
    name: string;
  }
  const [discData, setDiscData] = useState<discDataType>();
  const [profile, setProfile] = useState<any>({ _id: "", likedDiscs: [], baggedDiscs: [] });
  const [likedBy, setLikedBy] = useState<likeDataType[]>([]);
  const [isBagged, setIsBagged] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  const { discId } = useParams();

  const fetchDiscData = async () => {
    const disc = await discItApiClient.fetchDiscById(discId);
    setDiscData(disc);
    const likes = await discClient.findUsersThatLikeDisc(discId);
    setLikedBy(likes);

    if (currentUser) {
      setProfile(currentUser);

      const doesUserLikeDisc = await likeClient.doesUserLikeDisc(discId);
      console.log(`LIKES? ${doesUserLikeDisc}`);
      setIsLiked(doesUserLikeDisc);

      const doesUserBagDisc = await userClient.doesUserBagDisc(discId);
      setIsBagged(doesUserBagDisc);
    }
  };
  useEffect(() => {
    fetchDiscData();
  }, [isLiked]);

  const likeDisc = async () => {
    const likedDisc = {
      discId: discData?.id,
      name: `${discData?.brand} ${discData?.name}`,
      category: discData?.category,
    };
    await likeClient.userLikesDisc(likedDisc);
    setLikedBy([{ userId: currentUser._id, name: currentUser.name }, ...likedBy]);
    setIsLiked(true);
  };
  const unlikeDisc = async () => {
    await likeClient.userUnlikesDisc(discId);
    setLikedBy(likedBy.filter((user) => user.userId !== currentUser._id));
    setIsLiked(false);
  };
  const bagDisc = async () => {
    const baggedDisc = {
      discId: discData?.id,
      name: `${discData?.brand} ${discData?.name}`,
      category: discData?.category,
    };
    await userClient.userBagsDisc(baggedDisc);
    setIsBagged(true);
  };
  const unbagDisc = async () => {
    await userClient.userUnBagsDisc(discId);
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
      <ul className="list-group">
        {likedBy?.map((like: any) => (
          <li className="list-group-item" key={like.userId}>
            <Link to={`/Profile/${like.userId}`}>{like.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscDetails;
