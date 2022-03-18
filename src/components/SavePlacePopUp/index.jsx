import "./SavePlacePopUp.css";
import { useState } from "react";
import { createPlace } from "../../services/placesWs";
import Typography from "@mui/material/Typography";
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

const SavePlacePopUp = ({
  place,
  open,
  setOpen,
  tripId,
  setTripId,
  userTrips,
}) => {
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setTripId(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const savePlace = () => {
    const newPlace = {
      name: place.name,
      placeImages: place.photo.images.large.url,
      address: place.address_obj.street1,
      rating: place.rating,
      lat: place.latitude,
      lng: place.longitude,
      apiLocationId: place.location_id,
      num_reviews: place.num_reviews,
      ranking: place.ranking,
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
                <p>{error.errorMessage}</p>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={savePlace}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SavePlacePopUp;
