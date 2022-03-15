import "./TripCard.css";
import { Link, useNavigate } from "react-router-dom";
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

const TripCard = ({ userTrips }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();

  // handleon

  return (
    <>
      <Card sx={{ maxWidth: 275 }} className="trip-card-wrapper">
        <CardHeader title="Trip Tittle" />
          <CardMedia
            component="img"
            height="140"
            image="https://bit.ly/3q7JO2z"
            alt="travel-default"
          />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is the trip description.
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="new-trip-actions">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <div>
            <Typography variant="subtitle2" color="text.secondary">
              Places:
            </Typography>
          </div>
          <IconButton className="place-counter-badge" aria-label="places">
            <Badge badgeContent={4} color="primary" />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default TripCard;
