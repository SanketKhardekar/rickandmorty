import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const defaultUrl="https://rickandmortyapi.com/api/character/";
const initialState={
    isLoading:false,
    characters:[],
    isError:false,
}

export const getCharacters= createAsyncThunk("character/getCharacters",async(filter="")=>{
    try {
         const response= await fetch(defaultUrl+filter);
         if(!response.ok)
         {
             throw Error("Something Went Wrong")
         }
         const resData= await response.json();
         return resData.results;    
    } catch (error) {
        return error.message
    }
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
            state.isError=false;
        })
        builder.addCase(getCharacters.rejected,(state,action)=>{
            state.isLoading=false;
            state.characters=[];
            state.isError=true;
        })
    }
});

export default  characterSlice.reducer;