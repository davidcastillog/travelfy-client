import './PlaceCard.css'
import Typography from "@mui/material/Typography";
import { Paper } from '@mui/material';
import Rating from '@mui/material/Rating';

const PlaceCard = ({place}) => {
    return (
        <>
        <Paper className='place-card'>
        <Typography variant="h6">{place.name}</Typography>
        <span><Typography variant="body1">{place.rating}</Typography></span>
        <span><Rating name="read-only" value={Number(place.rating)} readOnly precision={0.5} /></span>
        <Typography variant="body1">{place.num_reviews} reviews</Typography>
        <Typography variant="body1">{place.price_level}</Typography>
        <Typography variant="body1">{place.ranking}</Typography>
        </Paper>
        </>
    )
}

export default PlaceCard;