import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import CharacterItem from "./CharacterItem";
const CharacterList = (props) => {
  const { characters } = props;
  if (characters.length <= 0) {
    return (
      <Fragment>
        <Grid
          container
          spacing={5}
          sx={{ margin: "30px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              sx={{ color: "whitesmoke" }}
              align="center"
              variant="h3"
            >
              Characters Not Found!
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Grid
        container
        rowSpacing={8}
        columnSpacing={10}
        justifyContent="center"
        alignItems="center"
      >
        {characters.map((character) => {
          return (
            <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
              <CharacterItem characterData={character} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default CharacterList;
