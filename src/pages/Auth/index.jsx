import "./Auth.css";
import Container from "@mui/material/Container";
import { Login, SignUp, GoogleSignIn } from "../../components";
import { getUserWS } from "../../services/authWs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

export default function Auth(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const isAuthenticated = () => {
    getUserWS().then((response) => {
      if (response.status) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          {isLoginPage ? <Login /> : <SignUp />}
          <div className="or-divider">
            <Divider>
              <Chip label="OR" />
            </Divider>
          </div>
          {isLoginPage ? (
            <GoogleSignIn status="Log in" />
          ) : (
            <GoogleSignIn status="Sign Up" />
          )}
        </Paper>
      </Container>
    </>
  );
}
