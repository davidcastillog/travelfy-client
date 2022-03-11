import "./PlaceMarker.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

const PlaceMarker = ({ place }) => {
  return (
      <div className="place-wrapper">
        <Paper elevation={2}>
        <Typography variant="subtitle2" gutterBottom>
          {place.name}
        </Typography>
        <Rating
          name="read-only"
          size="small"
          value={Number(place.rating)}
          readOnly
        />
      </Paper>
      <LocationOnIcon color="error" fontSize="large" />
      </div>
  );
};

export default PlaceMarker;
