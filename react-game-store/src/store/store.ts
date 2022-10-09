import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { gamesApi } from "../Http/rawg.api";
import { cartReducer } from "./reducers/Cart.slice";
import { whishlistReducer } from "./reducers/Whishlist.slice";

const reducers = {
    [gamesApi.reducerPath]: gamesApi.reducer,
    cartReducer,
    whishlistReducer
};

const rootReducer = combineReducers({
    ...reducers,
});

export const store = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(gamesApi.middleware),
})

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(store, { debug: true });