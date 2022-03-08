import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWS } from "../../services/authWs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = values;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      confirmPassword,
    };

    signUpWS(data)
      .then((response) => {
        if (response.status) {
          navigate("/");
        } else {
          setError(response.errorMessage);
        }
      })
      .catch((error) => {
        return error
      });
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-helperText"
          label="Email"
          value={email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          name="email"
        />
        <div className="input-field">
          <TextField
            id="outlined-password-input"
            label="Password"
            value={password}
            type="password"
            onChange={handleChange}
            name="password"
            autoComplete="current-password"
          />
        </div>
        <div className="input-field">
          <TextField
            id="outlined-confirmPassword-input"
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            autoComplete="current-password"
          />
        </div>
        <div className="submit-button">
          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography variant="body2" color="error">
            {error && (
              <div className="error-block">
                <p>{error}</p>
              </div>
            )}
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
