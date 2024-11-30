import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //DATA
	commerceDataArr: [],
   
   //SELECCIONES
   //instituteDataObj: {},
    //BOOLEANS/VARIABLES
}
const commerceSlice = createSlice({
	name: 'commerce',
	initialState,
	reducers: {
		SET_DATA_commerce: (state, action) => { 			
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_commerce>>', action.payload);
			//state.commerceDataArr = action.payload.commerceDataArr;
			state.commerceDataArr = action.payload
		}
    }
}
);
export const {
	SET_DATA_commerce,
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = commerceSlice.actions;
export default commerceSlice.reducer;