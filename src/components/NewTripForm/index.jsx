import { useState } from "react";
import { createTrip } from "../../services/tripsWs";
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

const NewTripForm = ({ open, setOpen, ...props }) => {
  const [error, setError] = useState(null);
  const [tripName, setTripName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setTripName(value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const newTripSave = async () => {
    const newTrip = {
      title: tripName,
    };

    createTrip(newTrip)
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
        <DialogTitle>Create a new Trip</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                id="outlined-basic"
                name="title"
                value={tripName}
                onChange={handleChange}
                label="Create a Trip"
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={newTripSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewTripForm;
