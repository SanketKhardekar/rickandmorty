import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import characterReducer from "../features/character/characterSlice";
import favoriteReducer from "../features/favoriteCharacter/favoriteCharacterSlice"
import authReducer from "../features/auth/authSlice";
export const store= configureStore({
    reducer:{   
        character: characterReducer,
        favroite: favoriteReducer,
        auth: authReducer,
    }
},applyMiddleware(thunk))