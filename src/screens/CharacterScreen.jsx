import { Fragment, useEffect, useState } from "react";
import { Grid, CircularProgress, Pagination } from "@mui/material";
import CharacterList from "../components/CharacterList";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters,addFilter } from "../features/character/characterSlice";
const CharacterScreen = (props) => {
  const [page,setPage]=useState(1);
  const dispatch = useDispatch();
  const { characters, isLoading, totalPages, error,filter } = useSelector(
    (state) => state.character
  );
  useEffect(()=>{
    setPage(filter.page);
  },[filter])
  useEffect(() => {
      if(characters.length === 0 && error=== null)
      dispatch(getCharacters());
  }, [dispatch,characters,error]);
  const onPageChangeHandler=(e,index)=>{
    setPage(index);
    dispatch(addFilter({page:index}))
    dispatch(getCharacters());
  }
  return (
    <Fragment>
      {isLoading ? (
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <CircularProgress size="large" color="secondary" />
        </Grid>
      ) : (
        <Fragment>
          <CharacterList characters={characters} />
          {totalPages > 0 ? (
            <div
              style={{
                marginTop:"20px",
                height:"100px",
                backgroundColor:"#D6D5A8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                color="primary"
                page={page}
                count={totalPages}
                onChange={onPageChangeHandler}
                size="large"
                sx={{
                  color:"white"
                }}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};
export default CharacterScreen;
