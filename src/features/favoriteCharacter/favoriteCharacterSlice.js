import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const defaultUrl="http://localhost:5000/api/favourite/";
const initialState={
    favorites:[],
}
export const fetchFavourites= createAsyncThunk('favourite/getCharacters',async(thunkApi,{ getState })=>{
    const state=getState();
    const token=state.auth.token;
    const response= await axios.get(defaultUrl,{ headers:{"Authorization": `Bearer ${token}`}});
    return { fav: response.data.payload.data }
})
export const addFavourite= createAsyncThunk('favourite/addCharacter',async(characterData,{ getState })=>{
    const state=getState();
    const token=state.auth.token;
    const response= await axios.post(`${defaultUrl}add`,{...characterData},{ headers:{"Authorization": `Bearer ${token}`}});
    return {...characterData,_id:response.data.payload.name}
})
export const deleteFavourite= createAsyncThunk('favourite/deleteCharacter',async(id,{ getState })=>{
    const state= getState() 
    const token=state.auth.token;
    const favs= state.favroite.favorites;
    const item=favs.find(element => { return element.id === id} );
    const response= await axios.delete(`${defaultUrl}delete`,{ params:{favId:item._id}, headers:{"Authorization": `Bearer ${token}`} });
    return { id }
})


const favoriteCharacterSlice=createSlice({
    name:"favoriteCharacter",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchFavourites.fulfilled,(state,action)=>{
            state.favorites=action.payload.fav;
        })
        builder.addCase(addFavourite.fulfilled,(state,action)=>{
            state.favorites.unshift(action.payload);
        })
        builder.addCase(deleteFavourite.fulfilled,(state,action)=>{
            state.favorites=state.favorites.filter(item => item.id !== action.payload.id)
        })
    }
    
});

export const {addFav,removeFav,setFav}=favoriteCharacterSlice.actions;
export default favoriteCharacterSlice.reducer