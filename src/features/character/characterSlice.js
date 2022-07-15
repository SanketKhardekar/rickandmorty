import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const defaultUrl="https://rickandmortyapi.com/api/character/";
const initialState={
    isLoading:false,
    filter:{
        page:1,
        name:"",
        status: "",
        species: "",
        type: "",
        gender: "",
    },
    nextPage:null,
    characters:[],
    totalPages:0,
    error:null,
}

export const getCharacters= createAsyncThunk("character/getCharacters",async(url=defaultUrl, { getState })=>{
        const state= getState();
        const filter=state.character.filter;
        const response= await axios.get(url,{params:filter});
        const pages=response.data.info.pages;
        return { data:response.data.results, pages:pages, nextPage: response.data.info.next};    
})

const characterSlice=createSlice({
    name:"character",
    initialState,
    reducers:{
        addFilter:(state,action)=>{
            state.filter={...state.filter,...action.payload} 
        },
        clearFilter:(state)=>{
            state.filter={
                page:1,
                name:"",    
                status: "",
                species: "",
                type: "",
                gender: "",
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCharacters.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(getCharacters.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.characters=action.payload.data;
            state.totalPages= +action.payload.pages;
            state.nextPage=action.payload.nextPage;
            state.error="";
        })
        builder.addCase(getCharacters.rejected,(state,action)=>{
            state.isLoading=false;
            state.nextPage=null;
            state.totalPages=0;
            state.error=action.error.code === "ERR_BAD_REQUEST" ? "Data Not Found" : "Sorry, Something Went Wrong!";
        })
    }
});
export const {addFilter,clearFilter }=characterSlice.actions;
export default  characterSlice.reducer;