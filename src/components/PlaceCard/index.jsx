import "./PlaceCard.css";
import { useState, useEffect } from "react";
import { getAllTrips } from "../../services/tripsWs";
import { createPlace } from "../../services/placesWs";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PlaceCard = ({ place, user }) => {
  const [open, setOpen] = useState(false);
  const [userTrips, setUserTrips] = useState([]);
  const [tripId, setTripId] = useState(0);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setTripId(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
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

  const savePlace = () => {
    const newPlace = {
      name: place.name,
      placeImages: place.photo.images.large.url,
      address: place.address_obj.street1,
      rating: place.rating,
      lat: place.latitude,
      lng: place.longitude,
      apiLocationId: place.location_id,
      _trip: tripId,
    };

    createPlace(newPlace)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        setError(error);
      });

    setOpen(false);
  };

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
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Select your Trip</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-dialog-select-label">Trip</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={tripId}
                    name="trip"
                    onChange={handleChange}
                    input={<OutlinedInput label="Trip" />}
                  >
                    {userTrips.map((trip, i) => (
                      <MenuItem key={i} value={trip._id}>
                        {trip.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Typography variant="body2" color="error">
                {error && (
                  <div className="error-block">
                    <p>{error.errorMessage}</p>
                  </div>
                )}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={savePlace}>Save</Button>
            </DialogActions>
          </Dialog>
        ) : (
          () => <></>
        )}
      </Paper>
    </>
  );
};

export default PlaceCard;
