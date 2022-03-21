import "./Filters.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Filters = ({ type, setType, rating, setRating }) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        direction="row"
        className="filter-grid"
        item
        xs={12}
      >
        <Typography variant="button" component="div">
          Filters
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 135 }}>
          <InputLabel id="demo-simple-select-label">Select </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="attractions">Attractions</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="restaurants">Restaurants</MenuItem>
          </Select>
        </FormControl>
        <Typography component="legend">Rating</Typography>
        <Rating
          id="rating"
          name="simple-controlled"
          value={rating}
          onChange={(e)=>setRating(Number(e.target.value))}
        />
      </Grid>
    </>
  );
};

export default Filters;
