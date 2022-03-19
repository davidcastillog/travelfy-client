import "./TripCard.css";
import {
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteTrip, getAllPlacesFromTrip } from "../../services/tripsWs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

const TripCard = ({ trip }) => {
  const [places, setPlaces] = useState([]);

  const shareUrl = `http://www.travelfy.com/trips/share/${trip._id}/places`;

  const placesFromTrip = async () => {
    const havePlaces = await getAllPlacesFromTrip(trip._id);
    if (havePlaces) {
      setPlaces(havePlaces.data.places);
    }
  };

  const handleDelete = () => {
    deleteTrip(trip._id);
    window.location.reload();
  };

  useEffect(() => {
    placesFromTrip();
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 275 }} className="trip-card-wrapper">
        {places.length > 0 ? (
          <Link
            to={`/trips/${trip._id}/places`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <CardHeader title={trip.title} />
            <CardMedia
              component="img"
              height="140"
              image={trip.tripImage}
              alt="travelfy"
            />
          </Link>
        ) : (
          <>
            <CardHeader title={trip.title} />
            <CardMedia
              component="img"
              height="140"
              image={trip.tripImage}
              alt="travelfy"
            />
          </>
        )}
        <CardContent className="card-content-wrapper">
          <Typography variant="body2" color="text.secondary">
            {trip.description}
          </Typography>
          <div className="social-share-div">
          <Typography variant="subtitle2" color="text.secondary">
            Share on:
          </Typography>
            <TwitterShareButton
              url={shareUrl}
              title={`This is my travel list "${trip.title}" @Travelfy`}
            >
              <TwitterIcon size={29} round={true}/>
            </TwitterShareButton>
            <FacebookShareButton
              url={shareUrl}
              quote={`This is my travel list "${trip.title}" @Travelfy`}
            >
              <FacebookIcon size={29} round={true}/>
            </FacebookShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={`This is my travel list "${trip.title}" @Travelfy`}
            >
              <WhatsappIcon size={29} round={true} m={1}  />
            </WhatsappShareButton>
          </div>
        </CardContent>
        <CardActions disableSpacing className="new-trip-actions">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default TripCard;
