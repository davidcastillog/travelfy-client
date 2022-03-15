import "./MyTrips.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import PlaceCard from "../../components/TripCard";

function MyTrips(props) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // User data
  const [user, setUser] = useState({});
  const [userTrips, setUserTrips] = useState([]);
  console.log("USER", user);
  console.log("TRIPS", userTrips);

  const navigate = useNavigate();

  /* Validate if user is logged in (JWT), get user data and set state
    If user is not logged in, redirect to login page */
  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      props.authenticate(response.data.user);
      setUser(response.data.user);
    } else {
      navigate("/login");
    }
  };

  console.log("USER IN STATE", props.user);

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <Container maxWidth="lg" className="mytrips-container" sx={{display: 'flex', flexWrap: 'wrap'}}>
      <PlaceCard />
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip._id}>
              <Item>
                <h3>{trip.tittle}</h3>
                <img
                  src={trip.tripImage}
                  alt="Trip"
                  style={{ width: "100%", height: "auto" }}
                />
                <p>{trip._places.length} places</p>
              </Item>
            </Grid>
          ))
        ) : (
          <>
              <Card sx={{ maxWidth: 275 }} className="trip-card-wrapper">
                <CardHeader title="Add a New Trip" />
                <CardMedia
                  component="img"
                  height="140"
                  image="https://bit.ly/3q7JO2z"
                  alt="travel-default"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Oh, the places you’ll go!
                  </Typography>
                </CardContent>
                <CardActions
                  className="new-trip-actions"
                  disableSpacing
                  sx={{ alignItems: "center" }}
                >
                  <IconButton aria-label="add">
                    <AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </CardActions>
              </Card>
          </>
        )}
      </Container>
    </>
  );
}

export default MyTrips;
