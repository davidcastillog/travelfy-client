import './Loader.css'
import { useState } from "react";
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  const [open, setOpen] = useState(true);

  return (
    <BackdropUnstyled
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open} className="place-list-loader"
    >
      <CircularProgress color="inherit" />
    </BackdropUnstyled>
  );
};

export default Loader;
