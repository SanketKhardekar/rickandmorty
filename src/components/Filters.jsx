import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const FiltersComponent = (props) => {
  const { onFilter } = props;
  const [filterFields, setFilterFields] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });
  const onApplyHandler = () => {
    let textArray = [];
    for (const key in filterFields) {
      if (filterFields[key].trim().length > 0) {
        textArray.push(key + "=" + filterFields[key]);
      }
    }
    onFilter("?" + textArray.join("&"));
  };
  const onClickReset = () => {
    setFilterFields({
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    });
    onFilter("");
  };
  return (
    <Paper
      elevation={20}
      sx={{
        backgroundColor: "#282c34",
        margin:"3rem",
        padding: "25px",
        color: "whitesmoke",
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={10} lg={1}>
          <Typography variant="h5" component="div">Filters</Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2}>
          <TextField
          fullWidth
            id="name"
            style={{ backgroundColor: "#D6D5A8" }}
            label="Filter By Name"
            variant="filled"
            value={filterFields.name}
            onChange={(e) => {
              setFilterFields({ ...filterFields, name: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2}>
          <FormControl fullWidth>
            <InputLabel id="label-status">Status</InputLabel>
            <Select
              labelId="label-status"
              style={{ backgroundColor: "#D6D5A8" }}
              value={filterFields.status}
              onChange={(e) => {
                setFilterFields({ ...filterFields, status: e.target.value });
              }}
            >
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2}>
          <TextField
          fullWidth
            id="species"
            style={{ backgroundColor: "#D6D5A8" }}
            label="Filter By Species"
            variant="filled"
            value={filterFields.species}
            onChange={(e) => {
              setFilterFields({ ...filterFields, species: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2}>
          <TextField
          fullWidth
            id="type"
            style={{ backgroundColor: "#D6D5A8" }}
            label="Filter By Character Type"
            variant="filled"
            value={filterFields.type}
            onChange={(e) => {
              setFilterFields({ ...filterFields, type: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={1}>
          <FormControl fullWidth>
            <InputLabel id="label-gender">Gender</InputLabel>
            <Select
              labelId="label-gender"
              style={{ backgroundColor: "#D6D5A8" }}
              value={filterFields.gender}
              onChange={(e) => {
                setFilterFields({ ...filterFields, gender: e.target.value });
              }}
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={8} md={4} lg={1}>
          <Button fullWidth color="success" variant="contained" onClick={onApplyHandler}>
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg={1}>
          <Button fullWidth sx={{backgroundColor:"white"}} variant="outlined" onClick={onClickReset}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FiltersComponent;
