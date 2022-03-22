import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWS } from "../../services/authWs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = values;

  const handleChange = (event) => {
    setError(null);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSignUp = () => {
    navigate("/signup");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const credentials = {
        email,
        password,
      };

      const { data, status, errorMessage } = await loginWS(credentials);
      if (status) {
        navigate("/mytrips");
        props.authenticate(data.user)
        return data;
      } else {
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.errorMessage);
    }
  }

  return (
    <div className="login-wrapper">
      <AccountCircleIcon fontSize="large" color="primary" />
      <Typography variant="h5" gutterBottom component="div">
        Login
      </Typography>
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
        <div className="auth-input-field">
          <TextField
            id="outlined-password-input"
            style={{ width: "43%" }}
            label="Password"
            value={password}
            type="password"
            onChange={handleChange}
            name="password"
            autoComplete="current-password"
          />
        </div>
        <div className="submit-button">
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <div className="signup-button">
            <Button variant="contained" onClick={handleSubmitSignUp}>
              Don't have an account? Sign up
            </Button>
          </div>
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

export default Login;
