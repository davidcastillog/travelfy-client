import "./Home.css";
import jsonData from "../../assets/destinations.json";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DestinationCard } from "../../components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function HomePage({ user, ...props }) {
  const citiesData = [...jsonData];
  const randomDestinations = citiesData
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          mt: 1,
          ml: 10,
        }}
      >
        <h1>HOME</h1>
        <Grid container spacing={2} sx={{ justifySelf: "center" }}>
          {randomDestinations.map((destination, i) => (
            <Grid item xs={12} md={3}>
              <DestinationCard destination={destination} key={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
