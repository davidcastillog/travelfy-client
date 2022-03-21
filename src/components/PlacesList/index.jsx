import "./PlacesList.css";
import { useState, useEffect } from "react";
import { getAllTrips } from "../../services/tripsWs";
import Grid from "@mui/material/Grid";
import PlaceCard from "../PlaceCard";
import NoPlacesFound from "../NoPlacesFound";
import Loader from "../Loader";

const PlacesList = ({ user, places, loadingPlaces, isSaved }) => {
  const [userTrips, setUserTrips] = useState([]);

  const getUserData = async () => {
    const response = await getAllTrips();
    if (response.status) {
      setUserTrips(response.data.trips);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {loadingPlaces ? (
        <>
          {" "}
          <Loader />{" "}
        </>
      ) : places.length > 0 ? (
        <Grid
          container
          spacing={2}
          className="placecard-grid"
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {places?.map((place, i) => (
            <PlaceCard
              place={place}
              user={user}
              userTrips={userTrips}
              setUserTrips={setUserTrips}
              isSaved={isSaved}
              key={i}
            />
          ))}
        </Grid>
      ) : (
        <NoPlacesFound />
      )}
    </>
  );
};

export default PlacesList;
