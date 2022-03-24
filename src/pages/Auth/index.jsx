import Container from "@mui/material/Container";
import { Login, SignUp } from "../../components";
import { getUserWS } from "../../services/authWs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";

export default function Auth(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const isAuthenticated = () => {
    getUserWS().then((response) => {
      if (response.status) {
        navigate("/mytrips");
      }
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Paper sx={{pb: 3}}>
          {isLoginPage ? <Login authenticate={props.authenticate}/> : <SignUp authenticate={props.authenticate} />}
        </Paper>
      </Container>
    </>
  );
}
