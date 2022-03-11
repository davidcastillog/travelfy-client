import * as React from "react";
import TravelfyLogo from "../../images/travelfy-logo-small.png";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Navbar = (props) => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <div className="travelfy-logo">
              <Link to="/">
                <img src={TravelfyLogo} alt="travelfy-logo" />
              </Link>
            </div>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          ></Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
