import { Favorite } from "@mui/icons-material";
import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CharacterItem.module.css";
import {
  addFav,
  removeFav,
} from "../features/favoriteCharacter/favoriteCharacterSlice";
import { addFavLocal, removeFavLocal } from "../services/services";
const CharacterItem = (props) => {
  const dispatch = useDispatch();
  const favArray = useSelector((state) => state.favroite.favorites);
  const favIndex = favArray.findIndex(
    (item) => item.id === props.characterData.id
  );
  let isFav = true;
  if (favIndex === -1) {
    isFav = false;
  }
  const [fav, setFav] = useState(isFav);

  const onFavClickHandler = () => {
    let action;
    if (!fav) {
      action = addFav(props.characterData);
      addFavLocal(props.characterData);
    } else {
      action = removeFav(props.characterData.id);
      removeFavLocal(props.characterData.id);
    }
    dispatch(action);
    setFav(!fav);
  };
  const origin = props.characterData.origin.name.replace(/\(.*\)/,"")
  return (
    <Card
      className={classes.item}
      elevation={20}
      sx={{ backgroundColor: "black", color:"white", maxWidth: 370, borderRadius: 5 }}
    >
      <CardHeader
        titleTypographyProps={{fontSize:"90%"}}
        sx={{ textTransform: "capitalize"}}
        title={props.characterData.name}
        subheader={"From " + origin}
        action={
          <ButtonBase>
            <Favorite
              fontSize="large"
              sx={{ color: fav ? "red" : "grey" }}
              onClick={onFavClickHandler}
            />
          </ButtonBase>
        }
      />
      <CardMedia
        component="img"
        height="100%"
        sx={{ marginLeft: "10%", width: "80%", borderRadius: "230px" }}
        image={props.characterData.image}
        alt={props.characterData.name}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          Status: {props.characterData.status}, Species:{" "}
          {props.characterData.species}, Gender: {props.characterData.gender},
          Location: {props.characterData.location.name}.
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ flexDirection: "row", justifyContent: "space-around" }}
      ></CardActions>
    </Card>
  );
};

export default CharacterItem;
