import "./AddTripCard.css";
import { useState } from "react";
import NewTripForm  from '../NewTripForm'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const AddTripCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  return (
    <>
      <Card sx={{ maxWidth: 275 }} className="trip-card-wrapper">
        <CardHeader title="Add a New Trip" />
        <CardMedia
          component="img"
          height="140"
          image="https://bit.ly/3qgL8Au"
          alt="travel-default"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Oh, the places you'll go!
          </Typography>
        </CardContent>
        <CardActions
          className="add-trip-actions"
          disableSpacing
          sx={{ alignItems: "center" }}
        >
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <NewTripForm open={open} setOpen={setOpen} />
        </CardActions>
      </Card>
    </>
  );
};

export default AddTripCard;
