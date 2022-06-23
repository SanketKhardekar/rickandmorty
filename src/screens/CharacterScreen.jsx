import { Fragment, useEffect, useState } from "react";
import { Grid, CircularProgress, Pagination } from "@mui/material";
import CharacterList from "../components/CharacterList";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../features/character/characterSlice";
const CharacterScreen = (props) => {
  const [page,setPage]=useState(0);
  const dispatch = useDispatch();
  const { filterText } = props;
  useEffect(() => {
    let text=filterText;
    let pageNumber=page;
    if(page > 0)
    {
      if(text.trim().length <= 0)
      {
        text+=`?page=${pageNumber}`;
      }
      else 
      {
        text+=`&page=${pageNumber}`;
        setPage(0);
      }
    }
    if (text.trim().length > 0) {
      dispatch(getCharacters(text));
    } else {
      dispatch(getCharacters());
    }
  }, [dispatch, filterText,page]);
  const { characters, isLoading, totalPages } = useSelector(
    (state) => state.character
  );
  return (
    <Fragment>
      {isLoading ? (
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
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
                onChange={(e,index)=>{ setPage(index)}}
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
