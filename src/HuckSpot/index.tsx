import { Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import "./styles.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Search from "./Search";
import SearchResults from "./Search/Results";
import Details from "./Details";
import Navigation from "./Navigation";

function HuckSpot() {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="d-flex">
        <div className="flex-grow-0 d-none d-lg-block side-bar">test</div>
        <div className="flex-fill container p-4">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile/" element={<Profile />} />
            <Route path="/Profile/:userId" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Search/:searchType" element={<SearchResults />} />
            <Route path="/Details/:discId" element={<Details />} />
          </Routes>
        </div>
        <div className="flex-grow-0 d-none d-lg-block side-bar">test</div>
      </div>
    </div>
  );
}
export default HuckSpot;
