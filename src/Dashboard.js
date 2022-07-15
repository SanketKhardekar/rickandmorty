import { Badge, Box, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import FiltersComponent from "./components/Filters";
import TabPanel from "./components/TabPanel";
import CharacterScreen from "./screens/CharacterScreen";
import FavoritesScreen from "./screens/FavroitesScreen";
import { fetchFavourites } from "./features/favoriteCharacter/favoriteCharacterSlice";
import { logout } from "./features/auth/authSlice.js"
function Dashboard() {
  const dispatch=useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const favLength = useSelector((state) => state.favroite.favorites).length;
  
  useEffect(()=>{
    dispatch(fetchFavourites());
  },[dispatch])
  const onLogoutClickHandler=()=>{
    dispatch(logout());
  }
   return (
    <div className="App">
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Typography
              sx={{ color:"white", marginLeft: "20px" }}
              align="left"
              variant="h3"
              component="div"
            >
              Rick & Morty
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={4}>
            <Tabs
              textColor="inherit"
              indicatorColor="primary"
              value={tabValue}
              onChange={(e, val) => {
                setTabValue(val);
              }}
              centered
            >
              <Tab sx={{ color:"white"}} label={<h3>Characters</h3>} />
              <Tab
                sx={{ color:"white"}}
                label={
                  <Badge color="success" badgeContent={favLength} max={5}>
                    <h3>Favorites</h3>
                  </Badge>
                }
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={2}>
            <IconButton onClick={onLogoutClickHandler}>
                <Typography variant="h5" color="white" component="div">Logout</Typography>
                <LogoutIcon color="info" fontSize="large"/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      {tabValue === 0 && <FiltersComponent />}
      <header>
        <ScrollToTop smooth color="green" />
        <TabPanel value={tabValue} index={0}>
          <CharacterScreen />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <FavoritesScreen />
        </TabPanel>
      </header>
    </div>
  );
}

export default Dashboard;
