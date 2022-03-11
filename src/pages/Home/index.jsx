import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import { geoLocationData } from "../../api/GeoLocationAPI";

export default function HomePage(props) {
  // User data
  const [user, setUser] = useState({});
  // User location from IP
  const [coordinates, setCoordinates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  /* Validate if user is logged in (JWT), get user data and set state
  If user is not logged in, redirect to login page */
  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      props.authenticate(response.data.user)
      setUser(response.data.user);
    } else {
      navigate("/login");
    }
  };

  // Get user Coords from IP as inicial reference
  const userGeoLocation = async () => {
    try {
      const res = await geoLocationData();
      const { latitude: lat, longitude: lng } = res;
      setCoordinates({ lat, lng });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  console.log("User Coordinates", coordinates);

  useEffect(() => {
    verifyUser();
    userGeoLocation();
  }, []);

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
