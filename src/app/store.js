import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import characterReducer from "../features/character/characterSlice";
import favoriteReducer from "../features/favoriteCharacter/favoriteCharacterSlice"
export const store= configureStore({
    reducer:{   
        character: characterReducer,
        favroite: favoriteReducer,
    }
},applyMiddleware(thunk))