import "./SearchBox.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBox = ({ type, setType, rating, setRating }) => {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        className="search-box-wrapper"
      >
        <TextField
          id="outlined-search"
          label="Where to?"
          type="search"
          style={{ width: "55%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default SearchBox;
