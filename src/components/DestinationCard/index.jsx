import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const DestinationCard = ({ destination, i }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/explore", {
      state: {
        destinationCoordinates: { lat: destination.lat, lng: destination.lng },
      },
    });
  };

  return (
    <Card
      sx={{ width: 260, height: 200, maxHeight: 300, ml:1, mt:1 }}
      i={i}
      onClick={handleOnClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={destination.image}
          alt={destination.city}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {destination.city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DestinationCard;
