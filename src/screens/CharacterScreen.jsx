import { Fragment,useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import CharacterList from "../components/CharacterList";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../features/character/characterSlice";
const CharacterScreen=(props)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getCharacters());
    },[dispatch])
    const {characters, isLoading }=useSelector(state => state.character);
    if(isLoading){
        return(
            <Fragment>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <CircularProgress color="secondary"/>
                </Grid>
            </Fragment>
        )
    }
    return(
        <Fragment>
            <CharacterList characters={characters}/>
        </Fragment>
    )
}
export default CharacterScreen;