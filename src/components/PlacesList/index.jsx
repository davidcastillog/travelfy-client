import "./PlacesList.css";
import Grid from "@mui/material/Grid";
import PlaceCard from "../PlaceCard";

const PlacesList = ({ places, loadingPlaces }) => {
  return (
    <>
    {loadingPlaces ? (
      <div>Loading...</div>
    ) : (
      <Grid container spacing={3}>

        {places?.map((place, i) => (
          <Grid key={i} item xs={12}>
            <PlaceCard
              place={place}
            />
          </Grid>
        ))}
      </Grid>
    )}
    </>
  );
};

export default PlacesList;
