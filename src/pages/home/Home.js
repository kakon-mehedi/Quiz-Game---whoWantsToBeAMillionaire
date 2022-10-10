import React from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="start-btn" onClick={() => navigate("/quiz")}>
        Start
      </button>
    </div>
  );
}

export default Home;
