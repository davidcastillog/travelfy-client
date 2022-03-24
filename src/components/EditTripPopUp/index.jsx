import { useState } from "react";
import { updateTrip } from "../../services/tripsWs";
import { uploadWs } from "../../services/uploadWs";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";

const EditTripPopUp = ({ open, setOpen, trip, ...props }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [values, setValues] = useState({
    title: trip.title,
    description: trip.description,
    tripImage: trip.tripImage,
  });

  const Input = styled("input")({
    display: "none",
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

  const handleUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("images", image);
    uploadWs(formData)
      .then((res) => {
        if(res.status){
          let resData = res.data
          setValues({
            ...values,
            tripImage: resData.result.newPath.url,
          });
          setMessage(res.data.msg);
        } else {
          return error
        }
      })
      .catch((err) => {
        setError(err);
      });
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
        <DialogContent sx={{ pb: 0 }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Avatar
                  alt="Travelfy User"
                  variant="rounded"
                  src={values.tripImage}
                  sx={{ alignSelf: "center", mt: 2 }}
                />
              </div>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  name="tripImage"
                  type="file"
                  onChange={handleUpload}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            {error && (
              <Box sx={{ m: 2, textAlign: "center" }}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>
            )}
            {message && (
              <Box sx={{ m: 2, textAlign: "center" }}>
                <Typography variant="body2" color="primary">
                  {message}
                </Typography>
              </Box>
            )}
          </Stack>
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
