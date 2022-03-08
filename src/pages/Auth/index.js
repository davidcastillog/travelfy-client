import "./Auth.css";
import Container from "@mui/material/Container";
import { Login, SignUp, GoogleSignIn, GoogleLOut } from "../../components";
import {getUserWS} from "../../services/authWs";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Auth({ authenticate }) {

  const navigate = useNavigate();

  const isAuthenticated = () => {
    getUserWS().then((response) => {
      if (response.status) {
        navigate("/");
      } else {
        navigate('/auth');
      }
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
        <SignUp />
        {/* <Login /> */}
        <div className="Google-Button">
          <GoogleSignIn />
        </div>
        <div className="Google-Button">
          <GoogleLOut />
        </div>
      </Container>
    </div>
  );
}
