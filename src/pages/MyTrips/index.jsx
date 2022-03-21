import "./MyTrips.css";
import { useState, useEffect } from "react";
import { getAllTrips } from "../../services/tripsWs";
import { TripCard, AddTripCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import Container from "@mui/material/Container";

function MyTrips({ props }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userTrips, setUserTrips] = useState([]);

  const navigate = useNavigate();

  // Validate if user is logged in (JWT)
  const verifyUser = async () => {
    const response = await getUserWS();
    if (!response.status) {
      navigate("/login");
    } else {
      setUser(response.data.user);
    }
  };

  // Get all trips from user
  const findUserTrips = async () => {
    const haveTrips = await getAllTrips();
    if (haveTrips) {
      setUserTrips(haveTrips.data.trips);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
    findUserTrips();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        className="mytrips-container"
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {!isLoading && userTrips.length > 0 ? (
          <>
            {userTrips.map((trip, i) => (
              <TripCard key={i} trip={trip} />
            ))}
            <AddTripCard />
          </>
        ) : (
          <AddTripCard />
        )}
      </Container>
    </>
  );
}

export default MyTrips;
