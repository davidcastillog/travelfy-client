import * as React from "react";
import TravelfyLogo from "../../assets/images/travelfy-logo-small.png";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { logoutWS } from "../../services/authWs";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LuggageIcon from "@mui/icons-material/Luggage";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ user, ...props }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  const defaultPic = "https://bit.ly/3tlE1bC";

  const buttonColor = grey[900];
  const buttonColorHover = grey[800];


  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logoutWS();
    setAnchorElUser(null)
    props.handleLogout()
    navigate("/login");
  };

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Box sx={{ display: "flex" }} onClose={(e) => setOpen(false)}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className="travelfy-logo-wrapper"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <div className="travelfy-logo">
                <Link to="/">
                  <img src={TravelfyLogo} alt="travelfy-logo" />
                </Link>
              </div>
            </Typography>
            {/* USER MENU */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 0.5,
                mr: 1,
              }}
              className="user-menu-appbar"
            >
              {user ? (
                <>
                  <Tooltip title="Open Menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Travelfy User"
                        src={user.profilePic || defaultPic}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      component={Link}
                      to={"/profile"}
                      onClick={handleCloseUserMenu}
                    >
                      <ListItemIcon>
                        <AccountCircleRoundedIcon />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={"/changepassword"}
                      onClick={handleCloseUserMenu}
                    >
                      <ListItemIcon>
                        <HttpsRoundedIcon />
                      </ListItemIcon>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: buttonColorHover } }}
                >
                  <AccountCircleRoundedIcon fontSize="small" sx={{mr:1}}/>
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {/* LEFT MENU¨ */}
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              style={{ color: "inherit" }}
              component={Link}
              to={"/"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ color: "inherit" }}
              component={Link}
              to={"/explore"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <TravelExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ color: "inherit" }}
              component={Link}
              to={"/aroundme"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonPinIcon />
                </ListItemIcon>
                <ListItemText primary="Around Me" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ color: "inherit" }}
              component={Link}
              to={"/weather"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <WbSunnyIcon />
                </ListItemIcon>
                <ListItemText primary="Weather" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              className="menu-font-tvf"
              style={{ color: "inherit" }}
              component={Link}
              to={"/mytrips"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LuggageIcon />
                </ListItemIcon>
                <ListItemText primary="My Trips" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              className="menu-font-tvf"
              style={{ color: "inherit" }}
              component={Link}
              to={"/profile"}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
