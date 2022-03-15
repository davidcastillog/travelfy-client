import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const AddTripCard = () => {
    return(
        <>
        <Card sx={{ maxWidth: 275 }} className="trip-card-wrapper">
          <CardHeader title="Add a New Trip" />
          <CardMedia
            component="img"
            height="140"
            image="https://bit.ly/3JsFXog"
            alt="travel-default"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Oh, the places you'll go!
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
    )
}

export default AddTripCard;