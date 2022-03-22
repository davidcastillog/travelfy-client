import { useState } from "react";
import { updateTrip } from "../../services/tripsWs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LuggageIcon from "@mui/icons-material/Luggage";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

const EditTripPopUp = ({ open, setOpen, trip, ...props }) => {
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: trip.title,
    description: trip.description,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setError(null);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const editTripSave = async (e) => {
    updateTrip(trip._id, values)
      .then((response) => {
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Edit your Trip</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1} sx={{ width: 250 }}>
            <FormControl sx={{ m: 1, mr: 0, ml: 0, minWidth: 150 }}>
              <TextField
                id="outlined-basic"
                name="title"
                defaultValue={trip.title}
                onChange={handleChange}
                label="Trip Name"
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
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={3}
                defaultValue={trip.description}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
          <Typography variant="body2" color="error">
            {error && <p>{error.errorMessage}</p>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editTripSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTripPopUp;
