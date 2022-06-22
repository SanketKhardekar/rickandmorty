import {Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import CharacterItem from "./CharacterItem";
const  CharacterList=(props)=>{
    const { characters }= props
    if(characters.length <= 0)
    {
        return(
            <Fragment>
                <Grid container spacing={5} sx={{marginTop:"30px"}} justifyContent="center" alignItems="center">
                    <Typography sx={{color:"whitesmoke"}} align="center" variant="h3" component="div"> Characters Not Found!</Typography> 
                </Grid>
            </Fragment>
        )
    }
    return(
        <Fragment>
            <Grid container rowSpacing={8} columnSpacing={10} justifyContent="center" alignItems="center">
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