import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWS } from "../../services/authWs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

const Login = () => {
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const credentials = {
        email,
        password,
      };

      const { data, status, errorMessage } = await loginWS(credentials);
      if (status) {
        navigate("/");
        return data;
      } else {
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.errorMessage);
    }
  }

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
        <div className="submit-button">
          <Button variant="contained" onClick={handleSubmit}>
            Login
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

export default Login;
