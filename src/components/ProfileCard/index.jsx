import { useState } from "react";
import { styled } from "@mui/material/styles";
import { updateUserWS } from "../../services/authWs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileCard = ({ user, ...props }) => {
  const [values, setValues] = useState({
    email: user.email,
    username: user.username,
    profilePic: user.profilePic,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setMessage(null);
    setError(null);
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleFormSubmission = (event) => {
    event.preventDefault();
    try {
      updateUserWS(values).then((response) => {
        if (response.status) {
          setMessage("Profile updated successfully");
          setError(null);
        } else {
          setError(response.errorMessage);
        }
      });
    } catch (error) {
      setError(error.errorMessage);
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Paper sx={{ maxWidth: 400 }}>
          <form onSubmit={handleFormSubmission}>
            <AccountCircleIcon
              fontSize="large"
              color="primary"
              sx={{ mt: 3 }}
            />
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ mb: 3 }}
            >
              Profile
            </Typography>
            <TextField
              id="outlined-basic"
              label="email"
              name="email"
              defaultValue={user.email}
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              name="username"
              label="Username"
              defaultValue={user.username}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: "300px", mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              name="firstName"
              defaultValue={user.firstName}
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              defaultValue={user.lastName}
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
            />
            <div>
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
                    src="https://bit.ly/3tlE1bC"
                    className="avatar-div"
                    sx={{ alignSelf: "center" }}
                  />
                </div>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    name="profilePic"
                    type="file"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ mb: 2 }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
            </div>
            <Button type="submit" variant="contained">
              Save
            </Button>
            {error ? (
              <Box sx={{ m: 2 }}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ m: 2 }}>
                <Typography variant="body2" color="primary">
                  {message}
                </Typography>
              </Box>
            )}
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ProfileCard;
