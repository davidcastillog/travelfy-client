import { useState } from "react";
import { createPlace } from "../../services/placesWs";
import { createTrip } from "../../services/tripsWs";
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
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import LuggageIcon from "@mui/icons-material/Luggage";
import IconButton from "@mui/material/IconButton";

const SavePlacePopUp = ({
  place,
  open,
  setOpen,
  tripId,
  setTripId,
  userTrips,
}) => {
  const [error, setError] = useState(null);
  const [notCreated, setNotCreated] = useState(null);
  const [tripName, setTripName] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleChangeNewTrip = (event) => {
    const { value } = event.target;
    setTripName(value);
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
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleChange = (event) => {
    setTripId(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const savePlace = () => {
    let address = ""
    if(place.location){
      address = place.location.address
    }
    const newPlace = {
      name: place.name,
      placeImages: place.photo.images.large.url,
      address,
      rating: place.rating,
      lat: place.latitude,
      lng: place.longitude,
      website: place.website || "",
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
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Create a new Trip
          </DialogTitle>
          <DialogContent>
            <Stack direction="row" spacing={1}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  id="outlined-basic"
                  name="title"
                  value={tripName}
                  disabled={isDisable}
                  onChange={handleChangeNewTrip}
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
        </Box>
        <Divider>
          <Chip label="OR" />
        </Divider>
        <DialogTitle sx={{ textAlign: "center" }}>Select your Trip</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
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
            {error && <p>{error.errorMessage}</p>}
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
