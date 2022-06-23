import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const defaultUrl="https://rickandmortyapi.com/api/character/";
const initialState={
    isLoading:false,
    characters:[],
    totalPages:0,
    error:"",
}

export const getCharacters= createAsyncThunk("character/getCharacters",async(filter="")=>{
         const response= await axios.get(defaultUrl+filter);
         const pages=response.data.info.pages;
         return { data:response.data.results, pages:pages };    
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
            state.characters=action.payload.data;
            state.totalPages= +action.payload.pages;
            state.error="";
        })
        builder.addCase(getCharacters.rejected,(state,action)=>{
            state.isLoading=false;
            state.characters=[];
            state.totalPages=0;
            state.error=action.error.code === "ERR_BAD_REQUEST" ? "Data Not Found" : "Sorry, Something Went Wrong!";
        })
    }
});

export default  characterSlice.reducer;