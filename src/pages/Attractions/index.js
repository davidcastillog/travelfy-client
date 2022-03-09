import "./Attractions.css";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Attractions() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={6} md={8}>
          <Item>Item 1</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Item 2</Item>
        </Grid>
      </Grid>
    </>
  );
}

export default Attractions;
