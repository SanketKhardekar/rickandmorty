import { Badge, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import FiltersComponent from "./components/Filters";
import TabPanel from "./components/TabPanel";
import CharacterScreen from "./screens/CharacterScreen";
import FavoritesScreen from "./screens/FavroitesScreen";
function App() {
  const [tabValue, setTabValue] = useState(0);
  const [filterText,setFilterText]=useState("");
  const onFilterChangeHandler = (text) => {
    setFilterText(text);
  };

  const favLength=useSelector(state => state.favroite.favorites).length;
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
          <Tab sx={{ color: "white" }} label={<h1>Characters</h1>} />
            <Tab sx={{ color: "white" }} label={<Badge color="secondary" badgeContent={favLength} max={5}><h1>Favorites</h1></Badge> } />
        </Tabs>
      </Box>
      {tabValue === 0 && <FiltersComponent onFilter={onFilterChangeHandler} /> }
      <header className="App-header">
        <ScrollToTop smooth color="green"/>
        <TabPanel value={tabValue} index={0}>
          <CharacterScreen filterText={filterText}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <FavoritesScreen />
        </TabPanel>
      </header>
    </div>
  );
}

export default App;
