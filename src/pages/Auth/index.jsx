import "./Auth.css";
import Container from "@mui/material/Container";
import { Login, SignUp, GoogleSignIn, GoogleLOut } from "../../components";
import { getUserWS } from "../../services/authWs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

export default function Auth({ authenticate }) {
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
    <div className="wrapper">
      <Paper>
        <Container className="auth-container" maxWidth="sm">
          {isLoginPage ? <Login /> : <SignUp />}
          <div className="Google-Button">
            <Divider>
              <Chip label="OR" />
            </Divider>
          </div>
          {isAuthenticated ? <GoogleSignIn /> : <GoogleLOut />}
        </Container>
      </Paper>
    </div>
  );
}
