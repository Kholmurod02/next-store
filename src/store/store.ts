
import {configureStore} from "@reduxjs/toolkit"
import { CategoryApi } from "./api/categoryApiSlice";
import { ProductApi } from "./api/productApiSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
    [CategoryApi.reducerPath]:CategoryApi.reducer,
    [ProductApi.reducerPath]:ProductApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        CategoryApi.middleware,
        ProductApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
