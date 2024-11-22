import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "../features/ShopSlice";
import cartSlice from "../features/CartSlice";
import authSlice from "../features/authSlice";
import { shopApi } from "../services/shopService";
import { receiptApi} from "../services/receiptsServices";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";


export const store = configureStore({
    reducer: {
        shopSlice,
        cartSlice,
        authSlice,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptApi.reducerPath]: receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(shopApi.middleware)
        .concat(receiptApi.middleware)
        .concat(authApi.middleware)
        .concat(userApi.middleware)
})