import { configureStore } from "@reduxjs/toolkit";
import commerceSlice from "../slices/commerceSlice";
//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      commerceReducer: commerceSlice,
      //productosSliceReducer: productosSlice,
    },
  });
  
  export default store;