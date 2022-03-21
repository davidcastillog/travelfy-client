import "./PlaceCard.css";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { deletePlace } from "../../services/placesWs";
import NewTripPopUp from "../NewTripPopUp";
import SavePlacePopUp from "../SavePlacePopUp";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LanguageIcon from "@mui/icons-material/Language";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const PlaceCard = ({ place, userTrips, setUserTrips, user, isSaved }) => {
  const [open, setOpen] = useState(false);
  const [tripId, setTripId] = useState("");

  // To Share on Social Media
  const [toShare, setToShare] = useState(false);

  const location = useLocation();
  const { id } = useParams();
  const isToShare = location.pathname === `/trips/share/${id}/places`;

  const isToShareOnSocial = () => {
    isToShare ? setToShare(true) : setToShare(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeletePlace = async () => {
    deletePlace(place._id);
    window.location.reload();
  };

  useEffect(() => {
    isToShareOnSocial();
  });

  return (
    <>
      <Card
        sx={{ width: 290, alignSelf: "flex-start" }}
        elevation={3}
        className="placecard-wrapper"
      >
        <CardHeader title={place.name} className="card-header" />
        {isSaved ? (
          <CardMedia
            style={{ height: 250 }}
            image={place.placeImages}
            title={place.name}
          />
        ) : (
          <CardMedia
            style={{ height: 250 }}
            image={
              place.photo
                ? place.photo.images.large.url
                : "https://bit.ly/3IrhUVA"
            }
            title={place.name}
          />
        )}
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="button">{place.rating}</Typography>
            <Rating
              name="read-only"
              precision={0.5}
              value={Number(place.rating)}
              readOnly
            />
            <Typography variant="body2">
              {place.num_reviews} review{place.num_reviews > 1 && "s"}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="caption">{place.ranking}</Typography>
          {place.price_level && (
            <div>
              <Typography variant="overline">
                Price Level: {place.price_level}
              </Typography>
            </div>
          )}
          {place.address ? (
            <Typography gutterBottom variant="body2" color="textSecondary">
              <LocationOnIcon fontSize="small" />
              {place.address}
            </Typography>
          ) : (
            <></>
          )}
          {place.website ? (
            <Button
              size="small"
              color="error"
              onClick={() => window.open(place.website, "_blank")}
            >
              <LanguageIcon fontSize="small" />
              Website
            </Button>
          ) : (
            <></>
          )}
        </CardContent>
        {toShare ? (
          <></>
        ) : (
          <CardActions className="placecard-actions">
            {user ? (
              <>
                {isSaved ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton aria-label="delete" onClick={handleDeletePlace}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Button onClick={handleClickOpen} variant="outlined">
                      SAVE
                    </Button>
                    {userTrips.length > 0 ? (
                      <SavePlacePopUp
                        open={open}
                        tripId={tripId}
                        place={place}
                        setOpen={setOpen}
                        setTripId={setTripId}
                        userTrips={userTrips}
                      />
                    ) : (
                      <NewTripPopUp
                        open={open}
                        tripId={tripId}
                        place={place}
                        setOpen={setOpen}
                        setTripId={setTripId}
                        userTrips={userTrips}
                        updateTrip={(trip) =>
                          setUserTrips([...userTrips, trip])
                        }
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Button variant="outlined" size="small" href="/login">
                  Login to Save
                </Button>
              </>
            )}
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default PlaceCard;
