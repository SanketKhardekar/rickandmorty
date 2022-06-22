import {
    Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const FiltersComponent = (props) => {
  const { onFilter }=props
  const [filterFields, setFilterFields] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });
  const onApplyHandler=()=>{
    let textArray=[];
        for (const key in filterFields) {
            if(filterFields[key].trim().length > 0 )
            {
                textArray.push(key+"="+filterFields[key])
            }
      }
      onFilter("?"+textArray.join("&"))
  }
  const onClickReset=()=>{
      setFilterFields({name:"",status:"",species:"",type:"",gender:""});
      onFilter("");
  }
  return (
    <Paper
      elevation={20}
      sx={{
        backgroundColor: "#282c34",
        margin:"30px",
        padding: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        color: "whitesmoke",
      }}
    >
      <h1>Filters</h1>
      <TextField
        id="name"
        style={{ backgroundColor: "#D6D5A8" }}
        label="Filter By Name"
        variant="filled"
        value={filterFields.name}
        onChange={(e) => {
          setFilterFields({ ...filterFields, name: e.target.value });
        }}
      />
      <FormControl sx={{width:"10%"}}>
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
      <TextField
        id="species"
        style={{ backgroundColor: "#D6D5A8" }}
        label="Filter By Species"
        variant="filled"
        value={filterFields.species}
        onChange={(e) => {
          setFilterFields({ ...filterFields, species: e.target.value });
        }}
      />
      <TextField
        id="type"
        style={{ backgroundColor: "#D6D5A8" }}
        label="Filter By Character Type"
        variant="filled"
        value={filterFields.type}
        onChange={(e) => {
          setFilterFields({ ...filterFields, type: e.target.value });
        }}
      />
        <FormControl sx={{width:"10%"}}>
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
      <Button color="success" variant="contained" onClick={onApplyHandler}>Apply Filters</Button>
      <Button color="primary" variant="contained" onClick={onClickReset}>Reset Filters</Button>
    </Paper>
  );
};

export default FiltersComponent;
