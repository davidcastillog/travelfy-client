import "./PlacesList.css";
import Grid from "@mui/material/Grid";
import PlaceCard from "../PlaceCard";
import NoPlacesFound from "../NoPlacesFound";
import Loader from "../Loader";

const PlacesList = ({ places, loadingPlaces }) => {

  return (
    <>
      {loadingPlaces ? (
        <> <Loader /> </>
      ) : places.length > 0 ? (
        <Grid container spacing={2}>
          {places?.map((place, i) => (
            <Grid key={i} item xs={12}>
              <PlaceCard place={place} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoPlacesFound />
      )}
    </>
  );
};

export default PlacesList;
