import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import TabPanel from "./components/TabPanel";
import CharacterScreen from "./screens/CharacterScreen";
import FavoritesScreen from "./screens/FavroitesScreen";
function App() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <div className="App">
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="inherit"
          indicatorColor="secondary"
          value={tabValue}
          onChange={(e, val) => {
            setTabValue(val);
          }}
          centered
        >
          <Tab sx={{ color: "white" }} label="Characters" />
            <Tab sx={{ color: "white" }} label="Favorites" />
        </Tabs>
      </Box>
      <header className="App-header">
        <ScrollToTop smooth color="green"/>
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
