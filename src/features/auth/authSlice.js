import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const defaultUrl="http://localhost:5000/api/user/";
const initialState={
    isLoggedIn:true,
    token:null,
    id:null
}
export const regsiterUser= createAsyncThunk('user/regsiterUser',async(userData )=>{
    try{
        await axios.post(`${defaultUrl}signup`,{...userData });
    }catch(error){
        throw error.response.data.payload.message;
    }
})
export const loginUser= createAsyncThunk('user/loginUser',async(loginData)=>{
    try{
        const response= await axios.post(`${defaultUrl}login`,{...loginData});
        
        return {token:response.data.payload.token,id:response.data.payload.id}
    }
    catch(error)
    {
        throw error.response.data.payload.message;
    }
})

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.isLoggedIn= action.payload.isLoggedIn;
            state.id=action.payload.id;
            state.token=action.payload.token;
        },
        logout:(state)=>{
            localStorage.removeItem("userData");
            state.isLoggedIn=false;
            state.id=null;
            state.token=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            localStorage.setItem("userData",JSON.stringify({token:action.payload.token, id:action.payload.id}));
            state.isLoggedIn=true;
            state.token=action.payload.token;
            state.id=action.payload.id;
        })
    }
});

export const {setLogin,logout}=authSlice.actions;
export default authSlice.reducer