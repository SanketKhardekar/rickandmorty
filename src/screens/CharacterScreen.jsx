import { Fragment, useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import CharacterList from "../components/CharacterList";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../features/character/characterSlice";
import FiltersComponent from "../components/Filters";
const CharacterScreen = (props) => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    if (filterText.trim().length > 0) {
      dispatch(getCharacters(filterText));
    } else {
      dispatch(getCharacters());
    }
  }, [dispatch, filterText]);
  const { characters, isLoading } = useSelector((state) => state.character);
  const onFilterChangeHandler = (text) => {
    setFilterText(text);
  };
  return (
    <Fragment>
      <FiltersComponent onFilter={onFilterChangeHandler} />
      {isLoading ? (
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <Fragment>
          <CharacterList characters={characters} />
        </Fragment>
      )}
    </Fragment>
  );
};
export default CharacterScreen;
