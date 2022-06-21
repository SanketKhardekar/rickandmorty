import { Favorite } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../features/favoriteCharacter/favoriteCharacterSlice";
const CharacterItem = (props) => {
  const dispatch=useDispatch();
  const favArray=useSelector(state => state.favroite.favorites);
  const favIndex= favArray.findIndex(item => item.id === props.characterData.id);
  let isFav=true;
  if(favIndex === -1)
  {
    isFav=false;
  }
  const [fav,setFav]=useState(isFav)

  const onFavClickHandler=()=>{
      let action;
      if(!fav)
      {
          action=addFav(props.characterData); 
      }
      else
      {
        action= removeFav(props.characterData.id);
      }
      dispatch(action);
      setFav(!fav);
  }
  const location=props.characterData.origin.name;
  return (
    <Card elevation={20} sx={{ backgroundColor:"#D6D5A8",maxWidth: 370, borderRadius:5 }}>
      <CardHeader
        sx={{ textTransform:"capitalize" }}
        title={props.characterData.name}
        subheader={"From "+location}
      />
      <CardMedia  
        component="img"
        height="400"
        sx={{borderRadius:"230px"}}
        image={props.characterData.image}
        alt={props.characterData.name}
      />
      <CardContent sx={{textAlign:"center"}}>
          <Typography variant="body2"> 
          Status: {props.characterData.status },
          Species: {props.characterData.species },
          Gender: {props.characterData.gender},
          Location: {props.characterData.location.name}.
          </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{flexDirection:"row", justifyContent:"space-around"}}>
        <Favorite fontSize="large" sx={{color: fav ? "red" : "grey"}} onClick={onFavClickHandler}/>      
      </CardActions>
    </Card>
  );
};

export default CharacterItem;
