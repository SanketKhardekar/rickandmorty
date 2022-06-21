import {Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import CharacterItem from "./CharacterItem";
const  CharacterList=(props)=>{
    const { characters }= props
    if(characters.length <= 0)
    {
        return(
            <Fragment>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Typography sx={{color:"whitesmoke"}} align="center" component="h1"> Data Not Found!</Typography> 
                </Grid>
            </Fragment>
        )
    }
    return(
        <Fragment>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                {characters.map((character)=>{   
                    return(
                        <Grid item key={character.id}>
                            <CharacterItem characterData={character} />
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    );
}

export default CharacterList;