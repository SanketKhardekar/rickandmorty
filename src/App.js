import { Badge, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import TabPanel from "./components/TabPanel";
import CharacterScreen from "./screens/CharacterScreen";
import FavoritesScreen from "./screens/FavroitesScreen";
function App() {
  const [tabValue, setTabValue] = useState(0);
  const favLength = useSelector((state) => state.favroite.favorites).length;
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
