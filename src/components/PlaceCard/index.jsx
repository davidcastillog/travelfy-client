import './PlaceCard.css'
import Typography from "@mui/material/Typography";

const PlaceCard = ({place}) => {
    return (
        <>
        <Typography gutterBottom variant="h4">{place.name}</Typography>
        <Typography gutterBottom variant="h6">{place.rating}</Typography>
        <Typography gutterBottom variant="h6">{place.price_level}</Typography>
        <Typography gutterBottom variant="h6">{place.ranking}</Typography>
        </>
    )
}

export default PlaceCard;