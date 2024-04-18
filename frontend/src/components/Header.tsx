import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut } from "../services/calendarService";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogin } from "../store/userSlice";
import { ReduxUserState } from "../store/stateTypes";

const drawerWidth = 240;
const navItems = ["Login", "Register", "About"];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = useSelector(
    (state: ReduxUserState) => state.user.userLoggedIn
  );
  const userName = useSelector((state: ReduxUserState) => state.user.userName);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // If request to api/calendars/login was a success redirects you to "/login"
  const logUserOut = async () => {
    try {
      const response = await signOut();
      if (response) {
        // setIsLoggedIn(false);
        dispatch(setUserLogin(false));
        navigate("/login");
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
      }}
    >
      {isLoggedIn ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to={"/calendars"}
                style={{ textDecoration: "none", color: "#0B2027" }}
              >
                <ListItemText primary={"My Calendars"} />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Sign out"} onClick={logUserOut} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "#0B2027" }}>
            <Typography
              variant="h6"
              sx={{ m: 2, width: "400px", textAlign: "left" }}
            >
              Home
            </Typography>
          </Link>
          <Divider />
          {navItems.map(
            (
              item // Added curly braces for JavaScript code
            ) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "#0B2027" }}
                  >
                    <ListItemText primary={item} />
                  </Link>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 2 }}>
      <AppBar
        component="nav"
        sx={{ position: "static", background: "#8affe8" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isLoggedIn ? (
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <AccountCircleIcon />
              <Typography>{userName}</Typography>
            </Box>
          ) : (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, color: "#0b2027" }}
              >
                Home
              </Typography>
            </Link>
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#0b2027" }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoggedIn ? (
              <>
                <Link to={""}>
                  <Button sx={{ color: "#0b2027" }}>My Calendars</Button>
                </Link>
                <Button sx={{ color: "#0b2027" }} onClick={logUserOut}>
                  Sign out
                </Button>
              </>
            ) : (
              navItems.map((item) => (
                <Link key={item} to={`/${item.toLocaleLowerCase()}`}>
                  <Button sx={{ color: "#0b2027" }}>{item}</Button>
                </Link>
              ))
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Header;
