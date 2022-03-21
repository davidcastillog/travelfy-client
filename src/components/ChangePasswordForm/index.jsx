import { useState } from "react";
import { changePasswordWS } from "../../services/authWs";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const ChangePasswordForm = ({ user, ...props }) => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    try {
      changePasswordWS(values).then((response) => {
        if (response.status) {
          setMessage(response.data.message);
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
        <Paper sx={{ width: 400 }}>
          <form onSubmit={handleFormSubmission}>
            <LockRoundedIcon fontSize="large" color="primary" sx={{ mt: 3 }} />
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ mb: 3 }}
            >
              Change Password
            </Typography>
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.oldPassword}
                autoComplete="password"
                name="oldPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ mt: 3, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.newPassword}
                autoComplete="new-password"
                name="newPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.confirmPassword}
                autoComplete="confirm-password"
                name="confirmPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Box sx={{ m: 2 }}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
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

export default ChangePasswordForm;
