import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";
import HuckSpot from "./HuckSpot";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="*" element={<HuckSpot />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
