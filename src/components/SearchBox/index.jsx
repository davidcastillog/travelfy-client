import "./SearchBox.css";
// import { useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBox = ({ setCoordinates }) => {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    },
  });

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { width: "100%" },
        }}
        className="search-box-wrapper"
      >
        <TextField
          id="outlined-basic"
          color="secondary"
          label="Where to?"
          variant="outlined"
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon edge="end" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default SearchBox;
