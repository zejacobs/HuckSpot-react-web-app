import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";
import HuckSpot from "./HuckSpot";
import { Provider } from "react-redux";
import store from "./HuckSpot/store";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="*" element={<HuckSpot />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
