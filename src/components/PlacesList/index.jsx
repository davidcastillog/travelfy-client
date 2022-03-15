import "./PlacesList.css";
import { useState, useEffect } from "react";
import { getAllTrips } from "../../services/tripsWs";
import Grid from "@mui/material/Grid";
import PlaceCard from "../PlaceCard";
import NoPlacesFound from "../NoPlacesFound";
import Loader from "../Loader";

const PlacesList = ({ places, loadingPlaces, user }) => {
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
        <> <Loader /> </>
      ) : places.length > 0 ? (
        <Grid container spacing={2}>
          {places?.map((place, i) => (
            <Grid key={i} item xs={12}>
              <PlaceCard place={place} user={user} userTrips={userTrips} setUserTrips={setUserTrips} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoPlacesFound />
      )}
    </>
  );
};

export default PlacesList;
