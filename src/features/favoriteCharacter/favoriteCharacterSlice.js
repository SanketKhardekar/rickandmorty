import { createSlice } from "@reduxjs/toolkit";

const initialState={
    favorites:[],
}

const favoriteCharacterSlice=createSlice({
    name:"favoriteCharacter",
    initialState,
    reducers:{
        addFav: (state,action)=>{
            state.favorites.unshift(action.payload)
        },
        removeFav:(state,action)=>{
            state.favorites=state.favorites.filter(item => item.id !== action.payload)
        }
    }
});

export const {addFav,removeFav}=favoriteCharacterSlice.actions;
export default favoriteCharacterSlice.reducer