import { Fragment, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import CharacterList from "../components/CharacterList";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../features/character/characterSlice";
const CharacterScreen = (props) => {
  const dispatch = useDispatch();
  const { filterText } =props;
  useEffect(() => {
    if (filterText.trim().length > 0) {
      dispatch(getCharacters(filterText));
    } else {
      dispatch(getCharacters());
    }
  }, [dispatch, filterText]);
  const { characters, isLoading} = useSelector((state) => state.character);
  return (
    <Fragment>
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
