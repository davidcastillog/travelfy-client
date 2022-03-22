import "./Home.css";
import jsonData from "../../assets/destinations.json";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DestinationCard, EditTripPopUp, SearchBox } from "../../components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HomeBanner from "../../assets/images/homebanner.jpg";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function HomePage({ user, ...props }) {
  const [coordinates, setCoordinates] = useState({});

  const citiesData = [...jsonData];
  const randomDestinations = citiesData
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (coordinates.lat && coordinates.lng) {
      navigate("/explore", {
        state: {
          destinationCoordinates: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
        },
      });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [coordinates]);

  return (
    <>
      <Grid
        maxWidth="xl"
        container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Box
          item
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            height: 350,
            maxWidth: "100%",
            backgroundImage: `url(${HomeBanner})`,
            mt: -1,
            ml: 5,
          }}
          className="home-banner-box"
        >
          <Box
            item
            xs={12}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Paper sx={{ width: "40%", p: 1, minWidth: 250 }}>
              <SearchBox setCoordinates={setCoordinates} />
            </Paper>
            <Typography variant="h6" mt={1}>
              Plan your next adventure!
            </Typography>
          </Box>
        </Box>
        <Box
          item
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
            ml: 5,
          }}
        >
          <Typography variant="h5" mt={1}>
            Popular destinations
          </Typography>
        </Box>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            mt: 1,
            ml: 5,
          }}
        >
          {randomDestinations.map((destination, i) => (
            <DestinationCard destination={destination} key={i} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
