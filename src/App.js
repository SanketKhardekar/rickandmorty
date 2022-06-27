import { Badge, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import FiltersComponent from "./components/Filters";
import TabPanel from "./components/TabPanel";
import CharacterScreen from "./screens/CharacterScreen";
import FavoritesScreen from "./screens/FavroitesScreen";
import { fetchLocalFavroites } from "./services/services";
import { setFav } from "./features/favoriteCharacter/favoriteCharacterSlice";
function App() {
  const dispatch=useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const favLength = useSelector((state) => state.favroite.favorites).length;
  useEffect(()=>{
    const favArray=fetchLocalFavroites();
    dispatch(setFav(favArray));
  },[dispatch])
   return (
    <div className="App">
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Typography
              sx={{ color: "whitesmoke", marginLeft: "20px" }}
              align="center"
              variant="h3"
              component="div"
            >
              Rick & Morty
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Tabs
              textColor="inherit"
              indicatorColor="secondary"
              value={tabValue}
              onChange={(e, val) => {
                setTabValue(val);
              }}
              centered
            >
              <Tab sx={{ color: "white" }} label={<h3>Characters</h3>} />
              <Tab
                sx={{ color: "white" }}
                label={
                  <Badge color="secondary" badgeContent={favLength} max={5}>
                    <h3>Favorites</h3>
                  </Badge>
                }
              />
            </Tabs>
          </Grid>
        </Grid>
      </Box>
      {tabValue === 0 && <FiltersComponent />}
      <header className="App-header">
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

export default App;
