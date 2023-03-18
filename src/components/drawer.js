import * as React from "react"
import { styled } from "@mui/material/styles"
import { Box, Stack } from "@mui/material"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { logout } from "../services/auth"
import AccountMenu from "./accountMenu"
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MovieIcon from '@mui/icons-material/Movie';
import GradingIcon from '@mui/icons-material/Grading';
import Settings from '@mui/icons-material/Settings';

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const useAppBarHeight = () => {
  const [appBarHeight, setAppBarHeight] = React.useState(0)

  React.useEffect(() => {
    const getAppBarHeight = ([{ target: AppBar }]) => {
      AppBar && setAppBarHeight(AppBar.clientHeight)
    }

    const resizeObserver = new ResizeObserver(getAppBarHeight)

    resizeObserver.observe(document.querySelector("header.MuiAppBar-root"))
  }, [])

  return appBarHeight
}

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false)
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const list = () => (
    <Box
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >

          <div id='something'
          component={Link}
          key="Home"
          to="/"
          sx={{ color: "#FFF" }}>
            <Typography  id="drawer-text" variant="h6" component="div">
              Light Rain Air
            </Typography>
          </div>


      <List>
        <ListItem
          component={Link}
          key="Home"
          to="/"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <HomeIcon sx={{mr: 2}}/>
            <ListItemText primary=" Home" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Service Video"
          to="/service-videos-list"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <MovieIcon sx={{mr: 2}}/>
            <ListItemText primary="Service Video" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Daily Bread"
          to="/daily-bread-list"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <MovieIcon sx={{mr: 2}}/>
            <ListItemText primary="Daily Bread" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Duty Guideline"
          to="/duty-guideline"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <GradingIcon sx={{mr: 2}}/>
            <ListItemText primary="Duty Guideline" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Chairman's words"
          to="/chairmans-words"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <ChatBubbleOutlineIcon sx={{mr: 2}}/> 
            <ListItemText primary="Chairman's words" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Material for WOD of Ministry of Theology"
          to="/material-for-wod-of-theology"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <AccountBalanceIcon sx={{mr: 2}}/>
            <ListItemText primary="Material for WOD of Ministry of Theology" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Material for WOD of Internal Affairs"
          to="/material-for-wod-of-ia"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <FolderIcon sx={{mr: 2}}/>
            <ListItemText primary="Material for WOD of Internal Affairs" />
          </ListItemButton>
        </ListItem>
        <ListItem
          component={Link}
          key="Study"
          to="/study"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <ImportContactsIcon sx={{mr: 2}}/>
            <ListItemText primary="Study" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem
          component={Link}
          key="Structure Change"
          to="/structure-change"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <Settings sx={{mr: 2}}/>
            <ListItemText primary="Structure Change" />
          </ListItemButton>
        </ListItem> */}
        <ListItem
          onClick={logout}
          key="Sign Out"
          sx={{ color: "#FFF" }}
          disablePadding
        >
          <ListItemButton>
            <LogoutIcon sx={{mr: 2}}/>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      {/* <Box sx={{ flexGrow: 1}}>
        
      </Box> */}
   <AppBar position="fixed" sx={{ background: "#026eaa" }}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleDrawerOpen}
            edge="start"
            color="inherit"
            sx={{ mr: 2, zIndex: 20, position: "absolute" }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems="center"
            justifyContent="center"
            sx={{
              flexGrow: 1,
              py: 1,
              position: "relative",
              width: "100vw",
              zIndex: 10,
            }}
          >
            {/* <Typography id="navbar-text" >
              Light Rain Air 
            </Typography> */}
            <div className="navbar-text">
              Light Rain Air 
            </div>
          </Stack>
          <AccountMenu />
        </Toolbar>
      </AppBar>

 

      <Toolbar id="toolbar-spacer" sx={{ "&#toolbar-spacer": {minHeight: useAppBarHeight() }}} />
      <React.Fragment>
        <SwipeableDrawer
          PaperProps={{
            sx: {
              backgroundColor: "#026eaa",
            },
          }}
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}
