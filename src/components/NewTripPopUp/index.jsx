import { useState } from "react";
import { createPlace } from "../../services/placesWs";
import { createTrip } from "../../services/tripsWs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LuggageIcon from "@mui/icons-material/Luggage";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const NewTripPopUp = ({
  place,
  open,
  setOpen,
  tripId,
  setTripId,
  ...props
}) => {
  const [error, setError] = useState(null);
  const [tripName, setTripName] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [notCreated, setNotCreated] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setTripName(value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const newTripSavePlace = async () => {
    const newTrip = {
      title: tripName,
    };

    createTrip(newTrip)
      .then((response) => {
        setTripId(response.data.trip._id);
        setIsDisable(true);
        setNotCreated(null);
        props.updateTrip(response.data.trip);
      })
      .catch((error) => {
        setError(error);
      });
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
      _trip: tripId,
    };

    createPlace(newPlace)
      .then((response) => {
        if (!response.status) {
          setNotCreated(response);
        } else {
          setOpen(false);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Create a new Trip</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                id="outlined-basic"
                name="title"
                value={tripName}
                disabled={isDisable}
                onChange={handleChange}
                label="Create Trip"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LuggageIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </FormControl>
            <IconButton
              aria-label="add"
              color="primary"
              onClick={newTripSavePlace}
            >
              <AddCircleIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="error">
            {notCreated && <p>Please save the trip first (+)</p>}
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

export default NewTripPopUp;
