import './NoPlacesFound.css'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';

const NoPlacesFound = () =>{
    return (
        <div className="noplaces-wrapper">
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
          <WrongLocationOutlinedIcon color="error" fontSize="large" />
            <Typography variant="h6">
              No places found!
              </Typography>
            <Typography variant="body2">
              Try another search or move the map around to find more places.
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
}

export default NoPlacesFound;