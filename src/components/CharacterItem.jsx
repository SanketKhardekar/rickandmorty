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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CharacterItem.module.css";
import {
  addFavourite,
  deleteFavourite,
} from "../features/favoriteCharacter/favoriteCharacterSlice";
const CharacterItem = (props) => {
  const dispatch = useDispatch();
  const favArray = useSelector((state) => state.favroite.favorites);
  const [fav, setFav] = useState(false);
  useEffect(()=>{
    const favIndex = favArray.findIndex(
      (item) => item.id === props.characterData.id
    );
    if (favIndex > -1) {
      setFav(true);
    }
  },[favArray,props.characterData.id])
  const onFavClickHandler = () => {
    let action;
    if (!fav) {
      action = addFavourite({
        id: props.characterData.id,
        name: props.characterData.name,
        origin: props.characterData.origin.name,
        image: props.characterData.image,
        status: props.characterData.status,
        species: props.characterData.species,
        gender: props.characterData.gender,
        location: props.characterData.location.name,
      });
    } else {
      action = deleteFavourite(props.characterData.id);
    }
    dispatch(action);
    setFav(!fav);
  };
  const origin = props.characterData.origin.name
    ? props.characterData.origin.name.replace(/\(.*\)/, "")
    : props.characterData.origin.replace(/\(.*\)/, "");
  return (
    <Card
      className={classes.item}
      elevation={20}
      sx={{
        backgroundColor: "black",
        color: "white",
        maxWidth: 370,
        borderRadius: 5,
      }}
    >
      <CardHeader
        titleTypographyProps={{ fontSize: "90%" }}
        sx={{ textTransform: "capitalize" }}
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
          Location:{" "}
          {props.characterData.location.name
            ? props.characterData.location.name
            : props.characterData.location}
          .
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
