import "./PlaceCard.css";
import { useState, useEffect } from "react";
import { getAllTrips } from "../../services/tripsWs";
import NewTripPopUp from "../NewTripPopUp";
import SavePlacePopUp from "../SavePlacePopUp";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const PlaceCard = ({ place }) => {
  const [open, setOpen] = useState(false);
  const [userTrips, setUserTrips] = useState([]);
  const [tripId, setTripId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

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
      <Paper className="place-card">
        <Typography variant="h6">{place.name}</Typography>
        <span>
          <Typography variant="body1">{place.rating}</Typography>
        </span>
        <span>
          <Rating
            name="read-only"
            value={Number(place.rating)}
            readOnly
            precision={0.5}
          />
        </span>
        <Typography variant="body1">{place.num_reviews} reviews</Typography>
        <Typography variant="body1">{place.price_level}</Typography>
        <Typography variant="body1">{place.ranking}</Typography>
        {place.website ? (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        ) : (
          <></>
        )}
        <Button onClick={handleClickOpen}>SAVE</Button>
        {userTrips.length > 0 ? (
          <SavePlacePopUp
            open={open}
            tripId={tripId}
            place={place}
            setOpen={setOpen}
            setTripId={setTripId}
            userTrips={userTrips}
          />
        ) : (
          <NewTripPopUp
            open={open}
            tripId={tripId}
            place={place}
            setOpen={setOpen}
            setTripId={setTripId}
            userTrips={userTrips}
          />
        )}
      </Paper>
    </>
  );
};

export default PlaceCard;
