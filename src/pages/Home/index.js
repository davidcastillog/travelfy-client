import "./Home.css";
import { useState, useEffect } from "react";
import { searchPlace } from "../../api/TravelAPI";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import { geoLocationData } from "../../api/GeoLocationAPI";
import { PlacesList } from "../../components";

export default function HomePage() {
  // User data
  const [user, setUser] = useState({});
  // User location from IP
  const [userCoords, setUserCoords] = useState({});
  // Places list
  const [places, setPlaces] = useState([]);
  // Search query
  const [valor, setValor] = useState("");

  const navigate = useNavigate();

  /* Validate if user is logged in (JWT), get user data and set state
  If user is not logged in, redirect to login page */
  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      setUser(response.data.user);
    } else {
      navigate("/login");
    }
  };

  // Get user Coords from IP as inicial reference
  const userGeoLocation = async () => {
    try {
      const res = await geoLocationData();
      const { latitude, longitude } = res;
      setUserCoords({ latitude, longitude });
    } catch (error) {
      return error;
    }
  };

  // Handle input change and set state
  const handleChange = (e) => {
    const { value } = e.target;
    setValor(value);
  };

  // Search for a place by name
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchPlace(valor);
    setPlaces(data);
    console.log(data);
  };

  useEffect(() => {
    verifyUser();
    userGeoLocation();
  }, []);

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>{}</p>
      <form onSubmit={handleSubmit}>
        <input name="nombre" onChange={handleChange} />
        <button>Search</button>
      </form>
    </div>
  );
}
