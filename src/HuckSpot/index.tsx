import { Route, Routes, Navigate } from "react-router";
import "./styles.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Search from "./Search";
import SearchResults from "./Search/Results";
import DiscDetails from "./Details/DiscDetails";
import TournamentDetails from "./Details/TournamentDetails";
import Admin from "./Admin";
import Navigation from "./Navigation";

function HuckSpot() {
  return (
    <div>
      <div className="flex-row">
        <Navigation />
      </div>
      <div className="flex-row main-content">
        <div className=" flex-row d-flex">
          <div className="d-none d-lg-block side-bar"></div>
          <div className="flex-fill container p-4 ">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile/" element={<Profile />} />
              <Route path="/Profile/:userId" element={<Profile />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Search/:searchType" element={<SearchResults />} />
              <Route path="/Details/Discs/:discId" element={<DiscDetails />} />
              <Route path="/Details/Tournaments/:tournamentId" element={<TournamentDetails />} />
              <Route path="/Admin/:adminType" element={<Admin />} />
            </Routes>
          </div>
          <div className="d-none d-lg-block side-bar"></div>
        </div>
      </div>
    </div>
  );
}
export default HuckSpot;
