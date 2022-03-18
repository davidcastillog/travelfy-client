import "./PlaceMarker.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

const PlaceMarker = ({ place }) => {
  return (
    <div className="place-wrapper">
      <LocationOnIcon color="error" fontSize="large" />
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          transform: "translate(10%, -155%)",
          zIndex: 1,
          "&:hover": { zIndex: 2 },
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          {place.name}
        </Typography>
        <Rating
          name="read-only"
          size="small"
          value={Number(place.rating)}
          precision={0.5}
          readOnly
        />
      </Paper>
    </div>
  );
};

export default PlaceMarker;
