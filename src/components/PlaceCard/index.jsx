import './PlaceCard.css'
import Typography from "@mui/material/Typography";

const PlaceCard = ({place}) => {
    return (
        <>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        </>
    )
}

export default PlaceCard;