
import {configureStore} from "@reduxjs/toolkit"
import { CategoryApi } from "./api/categoryApiSlice";
import { ProductApi } from "./api/productApiSlice";
import { CartApi } from "./api/cartApiSlice";
import { AuthApi } from "./api/authApiSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
    [CategoryApi.reducerPath]:CategoryApi.reducer,
    [ProductApi.reducerPath]:ProductApi.reducer,
    [CartApi.reducerPath]:CartApi.reducer,
    [AuthApi.reducerPath]:AuthApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        CategoryApi.middleware,
        ProductApi.middleware,
        CartApi.middleware,
        AuthApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
