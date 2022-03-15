import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import { geoLocationData } from "../../api/GeoLocationAPI";
import SearchBox from "../../components/SearchBox";

export default function HomePage({user,...props}) {

  return (
    <div
      style={{ height: "70vh", width: "100%" }}
      className="home-div-container"
    >
      <h1>HOME</h1>
    </div>
  );
}
