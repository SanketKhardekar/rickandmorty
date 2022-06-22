import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const defaultUrl="https://rickandmortyapi.com/api/character/";
const initialState={
    isLoading:false,
    characters:[],
    error:"",
}

export const getCharacters= createAsyncThunk("character/getCharacters",async(filter="")=>{
         const response= await axios.get(defaultUrl+filter);
         return response.data.results;    
})

const characterSlice=createSlice({
    name:"character",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getCharacters.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(getCharacters.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.characters=action.payload;
            state.error="";
        })
        builder.addCase(getCharacters.rejected,(state,action)=>{
            state.isLoading=false;
            state.characters=[];
            state.error=action.error.code === "ERR_BAD_REQUEST" ? "Data Not Found" : "Sorry, Something Went Wrong!";
        })
    }
});

export default  characterSlice.reducer;